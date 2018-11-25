import {GameState} from "./GameState";
import {StateId} from "./StateId";

class NoopState implements GameState {

  public static readonly ID = new StateId("state-noop");

  id(): StateId {
    return NoopState.ID;
  }

  moveToState(): StateId {
    throw new Error("MoveToState called in NoopState");
  }

  render(_: HTMLCanvasElement): void {
    throw new Error("Render called in NoopState");
  }

  setup(): void {
    throw new Error("Setup called in NoopState");
  }

  teardown(): void {
    throw new Error("Teardown called in NoopState");
  }

  update(_: number): void {
    throw new Error("Update called in NoopState");
  }
}

export {NoopState}
