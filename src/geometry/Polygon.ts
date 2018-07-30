import {Coordinate} from "./Coordinate";

class Polygon {
  readonly coordinates: Array<Coordinate>;

  constructor(coordinates: Array<Coordinate>) {
    this.coordinates = coordinates;
  }
}

export {Polygon}
