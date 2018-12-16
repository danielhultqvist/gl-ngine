class Image {
  public src: string;
  public width: number;
  public height: number;
  public xCenter: number;
  public yNumber: number;

  constructor(
    src: string,
    width: number,
    height: number,
    xCenter: number,
    yNumber: number) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.xCenter = xCenter;
    this.yNumber = yNumber;
  }
}

export {Image}
