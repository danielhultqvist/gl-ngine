import {Coordinate} from "./Coordinate";

class Axis {
  readonly dx: number;
  readonly dy: number;

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }

  dot(point: Coordinate) {
    return this.dx * point.x + this.dy * point.y;
  }
}

export {Axis}
