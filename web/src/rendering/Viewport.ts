class Viewport {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public translate(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public rescale(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export {Viewport}
