import {StateId} from "./StateId";

interface GameState {
  id(): StateId;
  moveToState(): StateId;
  render(canvas: HTMLCanvasElement): void;
  setup(canvas: HTMLCanvasElement): void;
  teardown(canvas: HTMLCanvasElement): void;
  update(deltaTime: number): void;
}

export {GameState}
