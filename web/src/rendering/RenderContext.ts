import {Coordinate} from "../geometry/Coordinate";
import {Color} from "./Color";

interface RenderContext {
  clear(): void;

  drawPartialImage(
    element: HTMLImageElement,
    srcX: number, srcY: number, srcW: number, srcH: number,
    dstX: number, dstY: number, dstW: number, dstH: number
  ): void;

  drawImageCenter(
    image: HTMLImageElement,
    x: number,
    y: number,
    srcX: number,
    srcY: number,
    width: number,
    height: number,
    centerX: number,
    centerY: number,
    scale: number,
    angleInRadians: number
  ): void

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
