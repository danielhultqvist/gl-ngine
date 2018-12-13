import {GameState} from "../GameState";
import {StateId} from "../StateId";
import {Gravity} from "../../physics/Gravity";
import {Map} from "../../map/Map";
import {Player} from "../../player/Player";
import {KeyState} from "./KeyState";
import {CollisionVector} from "../../collisiondetection/CollisionVector";
import {CollisionDetector} from "../../collisiondetection/CollisionDetector";
import {keyDownHandler, keyUpHandler, mouseDownHandler, mouseMoveHandler} from "./EventHandler";
import {MapLoader} from "../../map/MapLoader";
import {MAP_4} from "../../map/StandardMaps";
import {NoopState} from "../NoopState";
import {MainMenuState} from "../MainMenuState";
import {EventListener} from "../../events/EventListener";
import {CanvasRenderContext} from "../../rendering/canvas/CanvasRenderContext";
import {Viewport} from "../../rendering/Viewport";
import {RenderContext} from "../../rendering/RenderContext";
import {MouseState} from "./MouseState";
import {clampAbsolute, subtractSigned} from "../../util/MathUtils";
import {Item} from "../../spells/Item";

class PlayingState implements GameState {

  public static readonly ID: StateId = new StateId("state-playing");

  private nextState: StateId = NoopState.ID;

  private readonly player: Player;
  private readonly map: Map;
  private readonly keyState = new KeyState();
  private readonly mouseState = new MouseState(0, 0);
  private readonly viewport: Viewport;
  private readonly items: Item[];

  private collisionVectors: CollisionVector[] = [];
  private collisionDetector: CollisionDetector = new CollisionDetector();
  private eventListeners: EventListener[] = [];
  private socket: WebSocket | null = null;
  private allPlayers: Player[];

  private sendLoopId: number = -1;
  private static SEND_UPDATE_RATE: number = 1000 / 50;

  constructor() {
    this.player = new Player(325, 25, 0, 20);
    this.map = MapLoader.load(MAP_4);
    this.viewport = new Viewport(0, 0, 100, 100);
    this.items = [];
    this.allPlayers = [];
  }

  public id(): StateId {
    return PlayingState.ID;
  }

  public moveToState(): StateId {
    return this.nextState;
  }

  public render(canvas: HTMLCanvasElement): void {
    this.translateViewport(canvas);
    const renderContext: RenderContext = new CanvasRenderContext(canvas, this.viewport);

    this.map.render(renderContext);
    // this.player.render(renderContext);
    this.items.forEach(item => item.render(renderContext));
    this.allPlayers.forEach(player => {
      player.render(renderContext);
    })
  }

  public setup(canvas: HTMLCanvasElement): void {
    this.viewport.rescale(canvas.width, canvas.height);

    this.eventListeners.push(
      new EventListener("keydown", (e: KeyboardEvent) =>
        keyDownHandler(e, this.keyState, this.player)),
      new EventListener("keydown", (e: KeyboardEvent) => {
        if (e.key == 'm') {
          this.nextState = MainMenuState.ID;
        }
      }),
      new EventListener("keyup", (e: KeyboardEvent) => keyUpHandler(e, this.keyState)),
      new EventListener("mousedown",
        (e: MouseEvent) => mouseDownHandler(e, this.player, this.viewport, this.items)),
      new EventListener("mousemove",
        (e: MouseEvent) => {
          mouseMoveHandler(e, this.mouseState);
        }),
    );

    this.eventListeners.forEach(el => document.addEventListener(el.event, el.method));
    this.socket = new WebSocket("ws://" + location.hostname + ":" + 8080 + "/join");
    this.socket.onmessage = msg => this.handleMessage(msg);
    this.socket.onopen = () => {
      this.socket!.send(JSON.stringify({
          messageType: "register",
          data: {
            username: "Player 1"
          }
        }
      ));
      this.sendLoopId = window.setInterval(this.sendUpdate.bind(this), PlayingState.SEND_UPDATE_RATE);
    };
    this.socket.onclose = () => alert("WebSocket connection closed");
  }

  public teardown(): void {
    this.eventListeners.forEach(el => document.removeEventListener(el.event, el.method));
    clearInterval(this.sendLoopId);
  }

  public update(deltaTime: number): void {
    this.handleEvents(deltaTime);
    const {bottomCollision, topCollision} = this.handleCollisions();

    Gravity.apply(this.player, deltaTime);
    if (bottomCollision || topCollision) {
      this.player.dy = 0;
    }

    this.player.update();
    this.items.forEach(item => item.update());
  }

  private sendUpdate() {
    this.socket!.send(JSON.stringify({
      messageType: "update-player", data: {
        position: {
          x: this.player.x,
          y: this.player.y
        },
        vector: {
          dx: this.player.dx,
          dy: this.player.dy
        },
        animationFrame: this.player.animationFrame,
        movementState: this.player.movementState,
        direction: this.player.direction
      }
    }));
  }

  private handleCollisions(): any {
    let bottomCollision: boolean = false;
    let topCollision: boolean = false;

    if (this.player.y > this.map.boundary.bottomRight.y - this.player.height) {
      this.player.y = this.map.boundary.bottomRight.y - this.player.height;
      this.player.dy = 0;
      bottomCollision = true;
    } else if (this.player.y < this.map.boundary.topLeft.y) {
      this.player.y = 0;
      this.player.dy = 0;
      bottomCollision = true;
    }
    if (this.player.x > this.map.boundary.bottomRight.x - this.player.width) {
      this.player.x = this.map.boundary.bottomRight.x - this.player.width;
      this.player.dx = 0;
    } else if (this.player.x < this.map.boundary.topLeft.x) {
      this.player.x = 0;
      this.player.dx = 0;
    }

    this.collisionVectors = this.collisionDetector.detect(this.player, this.map.objects);

    let collisionDeltaX = 0;
    let collisionDeltaY = 0;
    this.collisionVectors.forEach(v => {
      collisionDeltaX += v.vector.dx * v.magnitude;
      collisionDeltaY += v.vector.dy * v.magnitude;
    });

    this.player.x = this.player.x + collisionDeltaX;
    this.player.y = this.player.y + collisionDeltaY;
    if (collisionDeltaY < -1e-8 && this.player.dy > 0) {
      bottomCollision = true;
    } else if (collisionDeltaY > 1e-8 && this.player.dy < 0) {
      topCollision = true;
    }
    return {bottomCollision, topCollision};
  }

  private handleEvents(deltaTime: number): void {
    if (this.keyState.left && this.keyState.right) {
      this.player.dx = 0;
    } else if (this.keyState.left) {
      this.player.dx = -300 * deltaTime;
    } else if (this.keyState.right) {
      this.player.dx = 300 * deltaTime;
    } else {
      this.player.dx = 0;
    }

    this.player.x = this.player.x + this.player.dx;
    this.player.y = this.player.y + this.player.dy;
  }

  // TODO [dh] This looks like crap!
  private translateViewport(canvas: HTMLCanvasElement): void {
    const {mouseOffsetX, mouseOffsetY} = this.mouseOffset(canvas);

    const x = Math.max(0, this.player.getCenter().x - canvas.width / 2 - mouseOffsetX);
    const y = Math.max(0, this.player.getCenter().y - canvas.height / 2 - mouseOffsetY);

    const dx = this.viewport.x - x;
    const dy = this.viewport.y - y;

    const clampedDx = clampAbsolute(canvas.width / 50, dx);
    const clampedDy = clampAbsolute(canvas.height / 50, dy);

    this.viewport.translate(this.viewport.x - clampedDx, this.viewport.y - clampedDy);
  }

  // TODO [dh] This looks like crap!
  private mouseOffset(canvas: HTMLCanvasElement) {
    const minMouseOffsetX = canvas.width / 6;
    const minMouseOffsetY = canvas.height / 6;

    let mouseOffsetX = clampAbsolute(canvas.width / 4, canvas.width / 2 - this.mouseState.relativeX);
    let mouseOffsetY = clampAbsolute(canvas.height / 4, canvas.height / 2 - this.mouseState.relativeY);

    if (Math.abs(mouseOffsetX) < minMouseOffsetX) {
      mouseOffsetX = 0;
    } else {
      mouseOffsetX = subtractSigned(mouseOffsetX, minMouseOffsetX)
    }
    if (Math.abs(mouseOffsetY) < minMouseOffsetY) {
      mouseOffsetY = 0;
    } else {
      mouseOffsetY = subtractSigned(mouseOffsetY, minMouseOffsetY);
    }
    return {mouseOffsetX, mouseOffsetY};
  }

  private handleMessage(msg: MessageEvent) {
    const json = JSON.parse(msg.data);
    const data = json.data;
    switch (json.messageType) {
      case "player-state": {
        this.allPlayers = data.players.map((player: any) => {
          const existingPlayer = new Player(player.position.x, player.position.y, player.vector.dx, player.vector.dy);
          existingPlayer.animationFrame = player.animationFrame;
          existingPlayer.direction = player.direction;
          existingPlayer.movementState = player.movementState;
          return existingPlayer
        });
        break;
      }
    }
  }
}

export {PlayingState}
