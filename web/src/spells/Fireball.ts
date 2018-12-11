import {MovementState} from "../player/MovementState";
import {Direction} from "../player/Direction";
import {Coordinate} from "../geometry/Coordinate";
import {RenderContext} from "../rendering/RenderContext";
import {AssetStore} from "../assets/AssetStore";
import {Item} from "./Item";

class Fireball implements Item {
  private static readonly MAX_ANIMATION = 7 * 8 + 5;

  x: number;
  y: number;
  dx: number;
  dy: number;

  animationFrame: number = 0;
  movementState: MovementState = MovementState.STAND;
  direction: Direction = Direction.RIGHT;

  readonly offsetX: number = 40;
  readonly offsetY: number = 20;
  readonly boxHeight: number = 100;
  readonly boxWidth: number = 100;
  readonly width: number = this.boxWidth - 2 * this.offsetX;
  readonly height: number = this.boxHeight - 2 * this.offsetY;
  readonly widthMargin: number = 20;
  readonly heightMargin: number = 20;

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  public hitbox(): Coordinate[] {
    return [
      new Coordinate(this.x + this.widthMargin / 2, this.y + this.heightMargin / 2),
      new Coordinate(this.x + this.width - this.widthMargin / 2, this.y + this.heightMargin / 2),
      new Coordinate(this.x + this.width - this.widthMargin / 2, this.y + this.height - this.heightMargin / 2),
      new Coordinate(this.x + this.widthMargin / 2, this.y + this.height - this.heightMargin / 2),
    ];
  }

  public update(): void {
    this.animationFrame += 1;
    if (this.animationFrame >= Fireball.MAX_ANIMATION) {
      this.animationFrame = 0;
    }
  }

  public render(renderContext: RenderContext): void {
    const srcX = Math.floor(this.animationFrame % 8) * this.boxWidth + this.offsetX;
    const srcY = Math.floor(this.animationFrame / 8) * this.boxHeight + this.offsetY;
    const srcW = this.width;
    const srcH = this.height;

    const dstX = this.x;
    const dstY = this.y;
    const dstW = this.width;
    const dstH = this.height;

    renderContext.drawPartialImage(
      AssetStore.get("spells-fireball"),
      srcX, srcY, srcW, srcH,
      dstX, dstY, dstW, dstH);
  }

  public getCenter(): Coordinate {
    return new Coordinate(this.x + this.width / 2, this.y + this.height / 2);
  }
}

export {Fireball}
