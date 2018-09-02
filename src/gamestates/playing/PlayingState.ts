import {GameState} from "../GameState";
import {StateId} from "../StateId";
import {Gravity} from "../../physics/Gravity";
import {Map} from "../../map/Map";
import {Player} from "../../player/Player";
import {KeyState} from "./KeyState";
import {CollisionVector} from "../../collisiondetection/CollisionVector";
import {CollisionDetector} from "../../collisiondetection/CollisionDetector";
import {click, keyDownHandler, keyUpHandler} from "./EventHandler";
import {MapLoader} from "../../map/MapLoader";
import {MAP_4} from "../../map/StandardMaps";
import {NoopState} from "../NoopState";
import {MainMenuState} from "../MainMenuState";
import {EventListener} from "../../events/EventListener";
import {RenderContext} from "../../rendering/RenderContext";
import {CanvasRenderContext} from "../../rendering/canvas/CanvasRenderContext";

class PlayingState implements GameState {

  public static readonly ID: StateId = new StateId("state-playing");

  private nextState: StateId = NoopState.ID;

  private readonly player: Player;
  private readonly map: Map;
  private readonly keyState = new KeyState();
  private readonly renderContext: RenderContext;

  private collisionVectors: CollisionVector[] = [];
  private collisionDetector: CollisionDetector = new CollisionDetector();
  private eventListeners: EventListener[] = [];

  constructor() {
    this.player = new Player(325, 25, 0, 20);
    this.map = MapLoader.load(MAP_4);
    this.renderContext = new CanvasRenderContext();
  }

  public id(): StateId {
    return PlayingState.ID;
  }

  public moveToState(): StateId {
    return this.nextState;
  }

  public render(canvas: HTMLCanvasElement): void {
    console.log(this.renderContext);
    this.map.render(canvas);
    this.player.render(canvas);
  }

  public setup(): void {
    const keystate = this.keyState;

    this.eventListeners.push(
      new EventListener("keydown", (e: KeyboardEvent) => keyDownHandler(e, keystate, this.player)),
      new EventListener("keydown", (e: KeyboardEvent) => {
        if (e.key == 'm') {
          this.nextState = MainMenuState.ID;
        }
      }),
      new EventListener("keyup", (e: KeyboardEvent) => keyUpHandler(e, keystate)),
      new EventListener("click", (e: MouseEvent) => click(e, this.player))
    );

    this.eventListeners.forEach(el => document.addEventListener(el.event, el.method));
  }

  public teardown(): void {
    this.eventListeners.forEach(el => document.removeEventListener(el.event, el.method));
  }

  public update(deltaTime: number): void {
    this.handleEvents(deltaTime);
    let {bottomCollision, topCollision} = this.handleCollisions();

    if (bottomCollision) {
      this.player.dy = 0;
    } else {
      if (topCollision) {
        this.player.dy = 0;
      }
      Gravity.apply(this.player, deltaTime);
    }

    this.player.update();
  }

  private handleCollisions() {
    let bottomCollision: boolean = false;
    let topCollision: boolean = false;

    // Temp to not fall out
    if (this.player.y > this.map.height - this.player.height) {
      this.player.y = this.map.height - this.player.height;
      this.player.dy = 0;
      bottomCollision = true;
    } else if (this.player.y < 0) {
      this.player.y = 0;
      this.player.dy = 0;
      bottomCollision = true;
    }
    if (this.player.x > this.map.width - this.player.width) {
      this.player.x = this.map.width - this.player.width;
      this.player.dx = 0;
    } else if (this.player.x < 0) {
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

  private handleEvents(deltaTime: number) {
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
}

export {PlayingState}
