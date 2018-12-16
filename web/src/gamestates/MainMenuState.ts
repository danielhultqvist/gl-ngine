import {GameState} from "./GameState";
import {StateId} from "./StateId";
import {NoopState} from "./NoopState";
import {PlayingState} from "./playing/PlayingState";
import {EventListener} from "../events/EventListener";

class MainMenuState implements GameState {

  public static readonly ID: StateId = new StateId("state-main-menu");

  private nextState: StateId = NoopState.ID;
  private eventListeners: EventListener[] = [];

  public id(): StateId {
    return MainMenuState.ID;
  }

  public moveToState(): StateId {
    return this.nextState;
  }

  public render(canvas: HTMLCanvasElement): void {
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");

    const fontSize: number = Math.floor(canvas.width / 30);

    ctx.save();
    ctx.font = `${fontSize}pt Calibri`;
    ctx.textAlign = "center";
    ctx.fillText("Ze Game!", canvas.width / 2, canvas.height / 3);
    ctx.restore();

    ctx.save();
    ctx.font = `${fontSize / 2}pt Calibri`;
    ctx.textAlign = "center";
    ctx.fillText("Press any key to start", canvas.width / 2, canvas.height / 3 + fontSize * 2);
    ctx.restore()
  }

  public setup(canvas: HTMLCanvasElement): void {
    this.eventListeners.push(
      new EventListener("keydown", (e: KeyboardEvent) => {
        e.preventDefault();
        this.nextState = PlayingState.ID
      }),
    );

    this.eventListeners.forEach(el => canvas.addEventListener(el.event, el.method));
  }

  public teardown(canvas: HTMLCanvasElement): void {
    this.eventListeners.forEach(el => canvas.removeEventListener(el.event, el.method));
  }

  public update(_: number): void {
  }
}

export {MainMenuState}
