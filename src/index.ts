import {CollisionDetector} from "./collisiondetection/CollisionDetector";
import {Player} from "./player/Player";
import {KeilDecomposer} from "./collisiondetection/KeilDecomposer";
import {CollisionVector} from "./collisiondetection/CollisionVector";
import {PolygonDecomposer} from "./collisiondetection/PolygonDecomposer";
import {click, keyDownHandler, keyUpHandler} from "./EventHandler";
import {KeyState} from "./keystate";
import {MAP_1} from "./map/StandardMaps";
import {Map} from "./map/Map";

class Main {

  private static UPDATE_RATE: number = 1000 / 25;

  readonly player: Player;
  readonly map: Map;
  readonly keyState = new KeyState();

  collisionVectors: CollisionVector[] = [];
  collisionDetector: CollisionDetector = new CollisionDetector();

  constructor() {
    this.player = new Player(325, 25, 2, 2);
    this.map = Main.loadMap();
  }

  private static loadMap(): Map {
    console.log("START: Loading objects");
    const before: number = new Date().getTime() / 1000;
    const decomposer: PolygonDecomposer = new KeilDecomposer();
    const map = MAP_1(decomposer);
    const after: number = new Date().getTime() / 1000;
    console.log(`DONE: Loading objects. Processing time: ${after - before} ms`);
    return map;
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
    document.addEventListener("keydown", e => keyDownHandler(e, keystate), false);
    document.addEventListener("keyup", e => keyUpHandler(e, keystate), false);
    document.addEventListener("click", click, false);
  }

  private update(): void {
    if (this.keyState.left) {
      this.player.x = this.player.x - this.player.dx;
    }
    if (this.keyState.right) {
      this.player.x = this.player.x + this.player.dx;
    }
    if (this.keyState.up) {
      this.player.y = this.player.y - this.player.dy;
    }
    if (this.keyState.down) {
      this.player.y = this.player.y + this.player.dy;
    }

    this.collisionVectors = this.collisionDetector.detect(this.player, this.map.objects);
    this.collisionVectors.forEach(v => {
      this.player.x = this.player.x + v.vector.dx * v.magnitude;
      this.player.y = this.player.y + v.vector.dy * v.magnitude;
    })
  }

  private render = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    Main.clear(canvas, ctx);
    this.map.render(ctx);
    this.player.render(ctx);
  };

  private static clear(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}


new Main().start();
