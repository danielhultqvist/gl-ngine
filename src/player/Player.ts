import {Coordinate} from "../geometry/Coordinate";
import {Renderable} from "../rendering/Renderable";

class Player implements Renderable {
  x: number;
  y: number;
  dx: number;
  dy: number;

  readonly width: number = 10;
  readonly height: number = 25;

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  public coordinates(): Coordinate[] {
    return [
      new Coordinate(this.x, this.y),
      new Coordinate(this.x + this.width, this.y),
      new Coordinate(this.x + this.width, this.y + this.height),
      new Coordinate(this.x, this.y + this.height),
    ];
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

export {Player}
