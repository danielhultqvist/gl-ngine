import {Asset} from "./assets/Asset";
import {AssetLoader} from "./assets/AssetLoader";
import {PlayingState} from "./gamestates/PlayingState";

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

  private lastTimestamp = Main.timestamp();
  private deltaTime: number = 0;
  private readonly updateStepSize = 1 / 60;
  private currentGameState: PlayingState = new PlayingState();

  public start(): void {
    AssetLoader.load(ALL_ASSETS, () => {
      Main.prepareCanvas();
      this.currentGameState.setup();
      requestAnimationFrame(this.loop);
    });
  }

  private loop = () => {
    const now = Main.timestamp();

    this.deltaTime = this.deltaTime + Math.min(1, (now - this.lastTimestamp) / 1000);
    while (this.deltaTime > this.updateStepSize) {
      this.deltaTime = this.deltaTime - this.updateStepSize;
      this.currentGameState.update(this.updateStepSize)
    }

    this.currentGameState.render();
    this.lastTimestamp = now;

    requestAnimationFrame(this.loop);
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
