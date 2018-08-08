import {CollisionDetector} from "./collisiondetection/CollisionDetector";
import {Player} from "./player/Player";
import {CollisionVector} from "./collisiondetection/CollisionVector";
import {click, keyDownHandler, keyUpHandler} from "./events/EventHandler";
import {KeyState} from "./events/keystate";
import {MAP_4} from "./map/StandardMaps";
import {Map} from "./map/Map";
import {Gravity} from "./physics/Gravity";
import {MapLoader} from "./map/MapLoader";
import {Asset} from "./assets/Asset";
import {AssetLoader} from "./assets/AssetLoader";
import {AssetStore} from "./assets/AssetStore";

const ALL_ASSETS = [
  new Asset(
    "characters-wizard",
    new URL("http://hulkfisk.com/game/assets/characters/wizard/wizard3.png")
  ),
  new Asset("map-layers-1", new URL("http://hulkfisk.com/game/assets/map/layers/1.png")),
  new Asset("map-layers-2", new URL("http://hulkfisk.com/game/assets/map/layers/2.png")),
  new Asset("map-layers-3", new URL("http://hulkfisk.com/game/assets/map/layers/3.png")),
  new Asset("map-layers-4", new URL("http://hulkfisk.com/game/assets/map/layers/4.png")),
];

class Main {
  private readonly player: Player;
  private readonly map: Map;
  private readonly keyState = new KeyState();

  private lastTimestamp = Main.timestamp();
  private deltaTime: number = 0;
  private readonly updateStepSize = 1 / 60;

  private collisionVectors: CollisionVector[] = [];
  private collisionDetector: CollisionDetector = new CollisionDetector();

  constructor() {
    this.player = new Player(325, 25, 0, 20);
    this.map = MapLoader.load(MAP_4);
  }

  public start(): void {
    AssetLoader.load(ALL_ASSETS, () => {
      this.listenToActions();
      Main.prepareCanvas();

      requestAnimationFrame(this.loop);
      // setInterval(this.loop, Main.UPDATE_RATE);
    });
  }

  private loop = () => {
    const now = Main.timestamp();

    this.deltaTime = this.deltaTime + Math.min(1, (now - this.lastTimestamp) / 1000);
    while (this.deltaTime > this.updateStepSize) {
      this.deltaTime = this.deltaTime - this.updateStepSize;
      this.update(this.updateStepSize)
    }

    this.render();

    this.lastTimestamp = now;

    requestAnimationFrame(this.loop);
  };

  private listenToActions(): void {
    const keystate = this.keyState;
    document.addEventListener("keydown", e => keyDownHandler(e, keystate, this.player), false);
    document.addEventListener("keyup", e => keyUpHandler(e, keystate), false);
    document.addEventListener("click", e => click(e, this.player), false);
  }

  private update(updateStepSize: number): void {
    if (this.keyState.left && this.keyState.right) {
      this.player.dx = 0;
    } else if (this.keyState.left) {
      this.player.dx = -300 * updateStepSize;
    } else if (this.keyState.right) {
      this.player.dx = 300 * updateStepSize;
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
      Gravity.apply(this.player, updateStepSize);
    }

    this.player.update();
  }

  private render = () => {
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
  };

  private static prepareCanvas(): void {
    (<Element>document.getElementById("loading")).remove();
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    canvas.width = 1024;
    canvas.height = 640;
    canvas.focus();
  }

  private static timestamp(): number {
    return window.performance && window.performance.now
      ? window.performance.now()
      : new Date().getTime();
  }
}

new Main().start();
