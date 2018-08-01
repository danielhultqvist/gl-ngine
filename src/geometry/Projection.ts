class Projection {
  readonly min: number;
  readonly max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  overlap(projection: Projection): boolean {
    return this.getOverlap(projection) > 0;
  }

  getOverlap(projection: Projection): number {
    const overlap: number = Math.min(this.max, projection.max) - Math.max(this.min, projection.min);
    return overlap > 0 ? overlap : -1;
  }
}

export {Projection}
