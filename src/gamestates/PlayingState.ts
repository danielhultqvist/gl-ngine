import {GameState} from "./GameState";
import {StateId} from "./StateId";
import {Gravity} from "../physics/Gravity";
import {Map} from "../map/Map";
import {Player} from "../player/Player";
import {KeyState} from "../events/keystate";
import {CollisionVector} from "../collisiondetection/CollisionVector";
import {CollisionDetector} from "../collisiondetection/CollisionDetector";
import {AssetStore} from "../assets/AssetStore";
import {click, keyDownHandler, keyUpHandler} from "../events/EventHandler";
import {MapLoader} from "../map/MapLoader";
import {MAP_4} from "../map/StandardMaps";

class PlayingState implements GameState {

  public static readonly ID: StateId = new StateId("state-playing");

  private readonly player: Player;
  private readonly map: Map;
  private readonly keyState = new KeyState();

  private collisionVectors: CollisionVector[] = [];
  private collisionDetector: CollisionDetector = new CollisionDetector();

  constructor() {
    this.player = new Player(325, 25, 0, 20);
    this.map = MapLoader.load(MAP_4);
  }

  id(): StateId {
    return PlayingState.ID;
  }

  render(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.drawImage(AssetStore.get("map-layers-1"), 0, 0, 1024, 640);
    ctx.drawImage(AssetStore.get("map-layers-2"), 0, 0, 1024, 640);
    ctx.drawImage(AssetStore.get("map-layers-3"), 0, 0, 1024, 640);
    ctx.drawImage(AssetStore.get("map-layers-4"), 0, 0, 1024, 640);
    ctx.restore();

    this.map.render(ctx);
    this.player.render(ctx);
  }

  setup(): void {
    const keystate = this.keyState;
    document.addEventListener("keydown", e => keyDownHandler(e, keystate, this.player), false);
    document.addEventListener("keyup", e => keyUpHandler(e, keystate), false);
    document.addEventListener("click", e => click(e, this.player), false);
  }

  teardown(): void {
    const keystate = this.keyState;
    document.removeEventListener("keydown", e => keyDownHandler(e, keystate, this.player));
    document.removeEventListener("keyup", e => keyUpHandler(e, keystate));
    document.removeEventListener("click", e => click(e, this.player));
  }

  update(deltaTime: number): void {
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

    let bottomCollision: boolean = false;
    let topCollision: boolean = false;

    // Temp to not fall out
    if (this.player.y > 640 - this.player.height) {
      this.player.y = 640 - this.player.height;
      this.player.dy = 0;
      bottomCollision = true;
    } else if (this.player.y < 0) {
      this.player.y = 0;
      this.player.dy = 0;
      bottomCollision = true;
    }
    if (this.player.x > 1024 - this.player.width) {
      this.player.x = 1024 - this.player.width;
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
}

export {PlayingState}
