import {Coordinate} from "./Coordinate";

class Axis {
  readonly dx: number;
  readonly dy: number;

  constructor(dx: number, dy: number) {
    const normalizeFactor: number = Math.sqrt(dx*dx + dy*dy);

    this.dx = dx / normalizeFactor;
    this.dy = dy / normalizeFactor;
  }

  dot(point: Coordinate) {
    return this.dx * point.x + this.dy * point.y;
  }
}

export {Axis}
