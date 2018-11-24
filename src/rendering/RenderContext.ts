import {Coordinate} from "../geometry/Coordinate";

interface RenderContext {
  clear(): void;

  drawPartialImage(
    element: HTMLImageElement,
    srcX: number, srcY: number, srcW: number, srcH: number,
    dstX: number, dstY: number, dstW: number, dstH: number
  ): void;

  drawFullImage(
    element: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  drawObject(coordinates: Coordinate[], color: Color): void;
}

export {RenderContext}
