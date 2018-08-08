import {StateId} from "./StateId";

interface GameState {
  id(): StateId;
  render(): void;
  setup(): void;
  teardown(): void;
  update(deltaTime: number): void;
}

export {GameState}
