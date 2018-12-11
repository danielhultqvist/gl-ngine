class MouseState {
  relativeX: number;
  relativeY: number;

  constructor(relativeX: number, relativeY: number) {
    this.relativeX = relativeX;
    this.relativeY = relativeY;
  }

  update(relativeX: number, relativeY: number) {
    this.relativeX = relativeX;
    this.relativeY = relativeY;
  }
}

export {MouseState}
