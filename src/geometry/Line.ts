import {Coordinate} from "./Coordinate";

class Line {
  readonly first: Coordinate;
  readonly second: Coordinate;

  constructor(first: Coordinate, second: Coordinate) {
    this.first = first;
    this.second = second;
  }

  intersection(secondLine: Line): Coordinate {
    const a1 = this.second.y - this.first.y;
    const b1 = this.first.x - this.second.x;
    const c1 = a1 * this.first.x + b1 * this.first.y;
    const a2 = secondLine.second.y - secondLine.first.y;
    const b2 = secondLine.first.x - secondLine.second.x;
    const c2 = a2 * secondLine.first.x + b2 * secondLine.first.y;
    const determinant = a1 * b2 - a2 * b1;

    if (determinant != 0) { // lines are not parallel
      const x = (b2 * c1 - b1 * c2) / determinant;
      const y = (a1 * c2 - a2 * c1) / determinant;
      return new Coordinate(x, y);
    } else {
      return new Coordinate(0, 0);
    }
  }
}

export {Line}
