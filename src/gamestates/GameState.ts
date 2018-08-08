import {StateId} from "./StateId";

interface GameState {
  id(): StateId;
  moveToState(): StateId;
  render(canvas: HTMLCanvasElement): void;
  setup(): void;
  teardown(): void;
  update(deltaTime: number): void;
}

export {GameState}
