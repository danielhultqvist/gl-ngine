import {RenderContext} from "../RenderContext";
import {Coordinate} from "../../geometry/Coordinate";
import {Color} from "../Color";

class CanvasRenderContext implements RenderContext {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawFullImage(
    element: HTMLImageElement, x: number, y: number, width: number, height: number): void {
    this.context.drawImage(element, x, y, width, height);
  }

  public drawPartialImage(
    element: HTMLImageElement,
    srcX: number, srcY: number, srcW: number, srcH: number,
    dstX: number, dstY: number, dstW: number, dstH: number): void {
    this.context.drawImage(element, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
  }

  drawObject(coordinates: Coordinate[], color: Color): void {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = color.code;
    this.context.moveTo(coordinates[0].x, coordinates[0].y);
    for (let i: number = 1; i < coordinates.length; ++i) {
      this.context.lineTo(coordinates[i].x, coordinates[i].y);
    }
    this.context.fill();
    this.context.restore();
  }
}

export {CanvasRenderContext}
