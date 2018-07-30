import {Coordinate} from "../geometry/Coordinate";
import {KeyState} from "../keystate";

class Player {
  x: number;
  y: number;
  dx: number;
  dy: number;

  keyState: KeyState = new KeyState();

  readonly width: number = 20;
  readonly height: number = 50;

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  public coordinates(): Array<Coordinate> {
    return [
      new Coordinate(this.x, this.y),
      new Coordinate(this.x + this.width, this.y),
      new Coordinate(this.x + this.width, this.y + this.height),
      new Coordinate(this.x, this.y + this.height),
    ];
  }
}

export {Player}
