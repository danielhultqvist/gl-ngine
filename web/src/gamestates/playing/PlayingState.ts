import {GameState} from "../GameState";
import {StateId} from "../StateId";
import {Gravity} from "../../physics/Gravity";
import {Map} from "../../map/Map";
import {Player} from "../../player/Player";
import {KeyState} from "./states/KeyState";
import {CollisionDetector} from "../../collisiondetection/CollisionDetector";
import {keyDownHandler, keyUpHandler, mouseDownHandler, mouseMoveHandler} from "./handlers/EventHandler";
import {MapLoader} from "../../map/MapLoader";
import {MAP_4} from "../../map/StandardMaps";
import {NoopState} from "../NoopState";
import {MainMenuState} from "../MainMenuState";
import {EventListener} from "../../events/EventListener";
import {CanvasRenderContext} from "../../rendering/canvas/CanvasRenderContext";
import {Viewport} from "../../rendering/Viewport";
import {RenderContext} from "../../rendering/RenderContext";
import {MouseState} from "./states/MouseState";
import {clampAbsolute, subtractSigned} from "../../util/MathUtils";
import {Item} from "../../spells/Item";
import {UpdatePlayerMessage} from "./messages/UpdatePlayerMessage";
import {CollisionHandler} from "./handlers/CollisionHandler";

class PlayingState implements GameState {

  public static readonly ID: StateId = new StateId("state-playing");

  private nextState: StateId = NoopState.ID;

  private readonly player: Player;
  private readonly map: Map;
  private readonly keyState = new KeyState();
  private readonly mouseState = new MouseState(0, 0);
  private readonly viewport: Viewport;
  private readonly items: Item[];

  private collisionDetector: CollisionDetector = new CollisionDetector();
  private eventListeners: EventListener[] = [];
  private socket: WebSocket | null = null;
  private otherPlayers: Player[];

  private sendLoopId: number = -1;
  private static SEND_UPDATE_RATE: number = 25;

  constructor() {
    this.player = new Player(325, 25, 0, 20, Math.random().toString(36));
    this.map = MapLoader.load(MAP_4);
    this.viewport = new Viewport(0, 0, 100, 100);
    this.items = [];
    this.otherPlayers = [];
  }

  public id(): StateId {
    return PlayingState.ID;
  }

  public moveToState(): StateId {
    return this.nextState;
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

    this.eventListeners.forEach(el => canvas.addEventListener(el.event, el.method));
    this.socket = new WebSocket("ws://" + location.hostname + ":" + 8080 + "/join");
    this.socket.onmessage = msg => this.handleMessage(msg);
    this.socket.onopen = () => {
      this.socket!.send(JSON.stringify({
          messageType: "register",
          data: {
            username: this.player.username,
          }
        }
      ));
      this.sendLoopId = window.setInterval(this.sendUpdate.bind(this), PlayingState.SEND_UPDATE_RATE);
    };
    this.socket.onclose = () => alert("WebSocket connection closed");
  }

  public teardown(canvas: HTMLCanvasElement): void {
    this.eventListeners.forEach(el => canvas.removeEventListener(el.event, el.method));
    clearInterval(this.sendLoopId);
  }

  private sendUpdate() {
    this.socket!.send(UpdatePlayerMessage.toJsonString(this.player));
  }

  public render(canvas: HTMLCanvasElement): void {
    this.translateViewport(canvas);
    const renderContext: RenderContext = new CanvasRenderContext(canvas, this.viewport);

    this.map.render(renderContext);
    this.player.render(renderContext);
    this.items.forEach(item => item.render(renderContext));
    this.otherPlayers.forEach(player => {
      player.render(renderContext);
    })
  }

  public update(deltaTime: number): void {
    // TODO [dħ] Should all of this move into Player#update(deltaTime)?
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

    const {bottomCollision, topCollision} =
      CollisionHandler.handle(this.player, this.map, this.collisionDetector);

    Gravity.apply(this.player, deltaTime);
    if (bottomCollision || topCollision) {
      this.player.dy = 0;
    }
    this.player.update(deltaTime);

    this.otherPlayers.forEach(player => {
      const dx = 300 * deltaTime * (player.dx > 0 ? 1 : -1);
      const dy = 300 * deltaTime * (player.dy > 0 ? 1 : -1);

      if (Math.abs(player.dx) > 10) {
        player.x = player.x + dx;
      }
      if (Math.abs(player.dy) > 10) {
        player.y = player.y + dy;
      }

      const {bottomCollision, topCollision} =
        CollisionHandler.handle(player, this.map, this.collisionDetector);

      Gravity.apply(player, deltaTime);
      if (bottomCollision || topCollision) {
        player.dy = 0;
      }
      player.update(deltaTime);
    });

    this.items.forEach(item => item.update(deltaTime));
  }

  // TODO [dh] This looks like crap!
  private translateViewport(canvas: HTMLCanvasElement): void {
    const {mouseOffsetX, mouseOffsetY} = this.mouseOffset(canvas);

    const x = Math.max(0, this.player.getCenter().x - canvas.width / 2 - mouseOffsetX);
    const y = Math.max(0, this.player.getCenter().y - canvas.height / 2 - mouseOffsetY);

    const dx = this.viewport.x - x;
    const dy = this.viewport.y - y;

    const clampedDx = clampAbsolute(canvas.width / 100, dx);
    const clampedDy = clampAbsolute(canvas.height / 100, dy);

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
        this.otherPlayers = data.players
          .filter((player: any) => player.username != this.player.username)
          .map((player: any) => {
            const existingPlayer = new Player(
              player.position.x,
              player.position.y,
              player.vector.dx,
              player.vector.dy,
              player.username
            );
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
