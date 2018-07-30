import {Coordinate} from "../geometry/Coordinate";

class MapObject {
  readonly coordinates: Array<Coordinate>;

  constructor(coordinates: Array<Coordinate>) {
    this.coordinates = coordinates;
  }
}

export {MapObject}
