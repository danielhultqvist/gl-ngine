import {RenderContext} from "../RenderContext";

class CanvasRenderContext implements RenderContext {

  readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }


  public clear() {
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export {CanvasRenderContext}
