import {Coordinate} from "../geometry/Coordinate";
import {Renderable} from "../rendering/Renderable";
import {MovementState} from "./MovementState";
import {AssetStore} from "../assets/AssetStore";
import {Direction} from "./Direction";
import {RenderContext} from "../rendering/RenderContext";
import {Updateable} from "../rendering/Updateable";

class Player implements Renderable, Updateable {
  private static readonly MAX_ANIMATION = 10 * 9;

  x: number;
  y: number;
  dx: number;
  dy: number;
  readonly username: string;

  animationFrame: number = 0;
  movementState: MovementState = MovementState.STAND;
  direction: Direction = Direction.RIGHT;

  readonly width: number = 64;
  readonly height: number = 80;
  readonly widthMargin: number = 16;
  readonly heightMargin: number = 10;

  constructor(x: number, y: number, dx: number, dy: number, username: string) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.username = username;
  }

  public hitbox(): Coordinate[] {
    return [
      new Coordinate(this.x + this.widthMargin / 2, this.y + this.heightMargin / 2),
      new Coordinate(this.x + this.width - this.widthMargin / 2, this.y + this.heightMargin / 2),
      new Coordinate(this.x + this.width - this.widthMargin / 2, this.y + this.height - this.heightMargin / 2),
      new Coordinate(this.x + this.widthMargin / 2, this.y + this.height - this.heightMargin / 2),
    ];
  }

  public update(_: number): void {
    this.animationFrame += 4;
    if (this.animationFrame > Player.MAX_ANIMATION) {
      this.animationFrame = 0;
    }

    if (this.dx > 0) {
      this.direction = Direction.RIGHT;
    } else if (this.dx < 0) {
      this.direction = Direction.LEFT;
    }

    if (Math.abs(this.dx) != 0) {
      this.movementState = MovementState.RUN;
    } else {
      this.movementState = MovementState.STAND;
    }
  }

  public render(renderContext: RenderContext): void {
    const srcX = Math.floor(this.animationFrame / 10) * this.width;
    const srcY = (this.movementState * 2 + this.direction) * this.height;
    const srcW = this.width;
    const srcH = this.height;
    const dstX = this.x;
    const dstY = this.y;
    const dstW = this.width;
    const dstH = this.height;

    renderContext.drawPartialImage(
      AssetStore.get("characters-wizard"),
      srcX, srcY, srcW, srcH,
      dstX, dstY, dstW, dstH);
  }

  public getCenter(): Coordinate {
    return new Coordinate(this.x + this.width / 2, this.y + this.height / 2);
  }
}

export {Player}
