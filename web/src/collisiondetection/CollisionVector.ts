import {Axis} from "../geometry/Axis";

class CollisionVector {
  readonly vector: Axis;
  readonly magnitude: number;

  constructor(vector: Axis, magnitude: number) {
    this.vector = vector;
    this.magnitude = magnitude;
  }
}

export {CollisionVector}
