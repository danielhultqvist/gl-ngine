import {Asset} from "./assets/Asset";
import {AssetLoader} from "./assets/AssetLoader";
import {GameState} from "./gamestates/GameState";
import {MainMenuState} from "./gamestates/MainMenuState";
import {PlayingState} from "./gamestates/playing/PlayingState";
import {goFullscreen} from "./util/FullscreenShim";

const ALL_ASSETS = [
  new Asset(
    "characters-wizard",
    new URL("http://hulkfisk.com/game/assets/characters/wizard/wizard3.png")
  ),
  new Asset(
    "spells-fireball",
    new URL("http://hulkfisk.com/game/assets/spells/fireball.png")
  ),
  new Asset("map-layers-1", new URL("http://hulkfisk.com/game/assets/map/layers/1.png")),
  new Asset("map-layers-2", new URL("http://hulkfisk.com/game/assets/map/layers/2.png")),
  new Asset("map-layers-3", new URL("http://hulkfisk.com/game/assets/map/layers/3.png")),
  new Asset("map-layers-4", new URL("http://hulkfisk.com/game/assets/map/layers/4.png")),
];

class Main {

  private lastTimestamp: number = Main.timestamp();
  private deltaTime: number = 0;
  private readonly updateStepSize: number = 1 / 60;
  private readonly canvas: HTMLCanvasElement;
  private currentGameState: GameState = new PlayingState();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public start(): void {
    AssetLoader.load(ALL_ASSETS, () => {
      Main.prepareCanvas();
      this.currentGameState.setup(this.canvas);
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

    this.render();
    this.lastTimestamp = now;

    this.handleState();

    requestAnimationFrame(this.loop);
  };

  private render() {
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    this.currentGameState.render(this.canvas);
  }

  private static prepareCanvas(): void {
    (<Element>document.getElementById("loading")).remove();
    canvas.width = 1600;
    canvas.height = 900;
    canvas.oncontextmenu = () => false;
    canvas.style.cursor = "crosshair";
    canvas.focus();
  }

  private static timestamp(): number {
    return window.performance && window.performance.now
      ? window.performance.now()
      : new Date().getTime();
  }

  private handleState() {
    let nextState: GameState | null = null;

    switch (this.currentGameState.moveToState()) {
      case MainMenuState.ID:
        nextState = new MainMenuState();
        break;
      case PlayingState.ID:
        nextState = new PlayingState();
        break;
    }

    if (nextState != null) {
      this.currentGameState.teardown(canvas);
      nextState.setup(this.canvas);
      this.currentGameState = nextState;
    }
  }
}

const fullscreenButton = document.getElementById("full-screen");
if (fullscreenButton != null) {
  fullscreenButton.addEventListener("click", _ => {
    goFullscreen(canvas);
  });
}

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
new Main(canvas).start();
