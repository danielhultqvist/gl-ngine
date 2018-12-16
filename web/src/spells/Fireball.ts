import {Coordinate} from "../geometry/Coordinate";
import {RenderContext} from "../rendering/RenderContext";
import {AssetStore} from "../assets/AssetStore";
import {Item} from "./Item";
import {Vector} from "../geometry/Vector";
import {Image} from "../rendering/Image";

class Fireball implements Item {
  private static readonly MAX_ANIMATION = 7 * 8 + 5;
  private static readonly SPEED = 400;

  x: number;
  y: number;
  direction: Vector;
  animationFrame: number;
  image: Image;

  readonly offsetX: number = 40;
  readonly offsetY: number = 20;
  readonly boxHeight: number = 100;
  readonly boxWidth: number = 100;
  readonly width: number = this.boxWidth - 2 * this.offsetX;
  readonly height: number = this.boxHeight - 2 * this.offsetY;
  readonly widthMargin: number = 20;
  readonly heightMargin: number = 20;

  constructor(x: number, y: number, direction: Vector) {
    this.x = x;
    this.y = y;
    this.animationFrame = 0;
    this.direction = direction;
    this.image = new Image("spells-fireball", 0, 0, 0, 0)
  }

  public hitbox(): Coordinate[] {
    return [
      new Coordinate(this.x + this.widthMargin / 2, this.y + this.heightMargin / 2),
      new Coordinate(this.x + this.width - this.widthMargin / 2, this.y + this.heightMargin / 2),
      new Coordinate(this.x + this.width - this.widthMargin / 2, this.y + this.height - this.heightMargin / 2),
      new Coordinate(this.x + this.widthMargin / 2, this.y + this.height - this.heightMargin / 2),
    ];
  }

  public update(deltaTime: number): void {
    this.animationFrame += 1;
    if (this.animationFrame >= Fireball.MAX_ANIMATION) {
      this.animationFrame = 0;
    }
    this.x += this.direction.normalized().dx * Fireball.SPEED * deltaTime;
    this.y += this.direction.normalized().dy * Fireball.SPEED * deltaTime;
  }

  public render(renderContext: RenderContext): void {
    const srcX = Math.floor(this.animationFrame % 8) * this.boxWidth + this.offsetX;
    const srcY = Math.floor(this.animationFrame / 8) * this.boxHeight + this.offsetY;
    const srcW = this.width;
    const srcH = this.height;
    const vectorAngleDifference = Math.acos(new Vector(0, 1).dot(this.direction.normalized()));
    const rotation = this.direction.dx < 0 ? vectorAngleDifference : -vectorAngleDifference;

    renderContext.drawImageCenter(
      AssetStore.get(this.image.src),
      this.x,
      this.y,
      srcX,
      srcY,
      srcW,
      srcH,
      10,
      60,
      1,
      rotation);
  }

  public getCenter(): Coordinate {
    return new Coordinate(this.x + this.width / 2, this.y + this.height / 2);
  }
}

export {Fireball}
