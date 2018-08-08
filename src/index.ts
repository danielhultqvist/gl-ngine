import {CollisionDetector} from "./collisiondetection/CollisionDetector";
import {Player} from "./player/Player";
import {CollisionVector} from "./collisiondetection/CollisionVector";
import {click, keyDownHandler, keyUpHandler} from "./events/EventHandler";
import {KeyState} from "./events/keystate";
import {MAP_3} from "./map/StandardMaps";
import {Map} from "./map/Map";
import {Gravity} from "./physics/Gravity";
import {MapLoader} from "./map/MapLoader";

class Main {

  private static UPDATE_RATE: number = 1000 / 25;

  readonly player: Player;
  readonly map: Map;
  readonly keyState = new KeyState();

  collisionVectors: CollisionVector[] = [];
  collisionDetector: CollisionDetector = new CollisionDetector();

  constructor() {
    this.player = new Player(325, 25, 0, 20);
    this.map = MapLoader.load(MAP_3);
  }

  public start(): void {
    this.listenToActions();

    setInterval(this.loop, Main.UPDATE_RATE);
  }

  private loop = () => {
    this.update();

    this.render();
  };

  private listenToActions(): void {
    const keystate = this.keyState;
    document.addEventListener("keydown", e => keyDownHandler(e, keystate, this.player), false);
    document.addEventListener("keyup", e => keyUpHandler(e, keystate), false);
    document.addEventListener("click", e => click(e, this.player), false);
  }

  private update(): void {
    if (this.keyState.left && this.keyState.right) {
      this.player.dx = 0;
    } else if (this.keyState.left) {
      this.player.dx = -10;
    } else if (this.keyState.right) {
      this.player.dx = 10;
    } else {
      this.player.dx = 0;
    }

    this.player.x = this.player.x + this.player.dx;
    this.player.y = this.player.y + this.player.dy;

    let bottomCollision: boolean = false;

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
    this.collisionVectors.forEach(v => {
      this.player.x = this.player.x + v.vector.dx * v.magnitude;
      this.player.y = this.player.y + v.vector.dy * v.magnitude;
      if (Math.abs(v.vector.dy) > 1e-8 && this.player.dy > 0) {
        bottomCollision = true;
      }
    });

    if (bottomCollision) {
      this.player.dy = 0;
    } else {
      Gravity.apply(this.player);
    }
  }

  private render = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.map.render(ctx);
    this.player.render(ctx);
  };
}

new Main().start();
