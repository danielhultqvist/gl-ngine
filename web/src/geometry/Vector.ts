import {Coordinate} from "./Coordinate";

class Vector {
  readonly dx: number;
  readonly dy: number;

  constructor(dx: number, dy: number) {
    this.dx = dx == -0 ? 0 : dx;
    this.dy = dy == -0 ? 0 : dy;
  }

  public dot(other: Coordinate | Vector): number {
    if (other instanceof Coordinate) {
      return this.dx * other.x + this.dy * other.y;
    } else {
      return this.dx * other.dx + this.dy * other.dy;
    }
  }

  public normalized(): Vector {
    const normalizeFactor: number = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    return new Vector(this.dx / normalizeFactor, this.dy / normalizeFactor);
  }

  public negate(): Vector {
    return new Vector(this.dx * -1, this.dy * -1);
  }
}

export {Vector}
