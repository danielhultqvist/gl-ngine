import {Coordinate} from "./Coordinate";

class Axis {
  readonly dx: number;
  readonly dy: number;

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }

  public dot(point: Coordinate): number {
    return this.dx * point.x + this.dy * point.y;
  }

  public normalized(): Axis {
    const normalizeFactor: number = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    return new Axis(this.dx / normalizeFactor, this.dy / normalizeFactor);
  }
}

export {Axis}
