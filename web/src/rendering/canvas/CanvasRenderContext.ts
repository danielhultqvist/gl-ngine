import {RenderContext} from "../RenderContext";
import {Coordinate} from "../../geometry/Coordinate";
import {Color} from "../Color";
import {Viewport} from "../Viewport";

/** Optimize rendering, ignore render if outside viewport **/
class CanvasRenderContext implements RenderContext {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly viewport: Viewport;

  constructor(canvas: HTMLCanvasElement, viewport: Viewport) {
    this.canvas = canvas;
    this.viewport = viewport;
    this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  public drawFullImage(
    element: HTMLImageElement, x: number, y: number, width: number, height: number): void {
    const adjustedX = this.adjustXAccordingToViewport(x);
    const adjustedY = this.adjustYAccordingToViewport(y);
    this.context.drawImage(element, adjustedX, adjustedY, width, height);
  }

  public drawPartialImage(
    element: HTMLImageElement,
    srcX: number, srcY: number, srcW: number, srcH: number,
    dstX: number, dstY: number, dstW: number, dstH: number): void {
    const adjustedX = this.adjustXAccordingToViewport(dstX);
    const adjustedY = this.adjustYAccordingToViewport(dstY);

    this.context.drawImage(element, srcX, srcY, srcW, srcH, adjustedX, adjustedY, dstW, dstH);
  }

  public drawObject(coordinates: Coordinate[], color: Color): void {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = color.code;
    this.context.moveTo(
      this.adjustXAccordingToViewport(coordinates[0].x),
      this.adjustYAccordingToViewport(coordinates[0].y));

    for (let i: number = 1; i < coordinates.length; ++i) {
      this.context.lineTo(
        this.adjustXAccordingToViewport(coordinates[i].x),
        this.adjustYAccordingToViewport(coordinates[i].y));
    }
    this.context.fill();
    this.context.restore();
  }

  private adjustXAccordingToViewport(x: number): number {
    return x - this.viewport.x;
  }

  private adjustYAccordingToViewport(y: number): number {
    return y - this.viewport.y;
  }
}

export {CanvasRenderContext}
