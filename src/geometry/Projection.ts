class Projection {
  readonly min: number;
  readonly max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  overlap(projection: Projection): boolean {
    return Math.min(this.max, projection.max) - Math.max(this.min, projection.min) > 0;
  }
}

export {Projection}
