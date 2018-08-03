class Coordinate {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distance(coordinate: Coordinate): number {
    return (this.x - coordinate.x) * (this.x - coordinate.x) +
      ((this.y - coordinate.y) * (this.y - coordinate.y));
  }
}

export {Coordinate}