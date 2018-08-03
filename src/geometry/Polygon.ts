import {Coordinate} from "./Coordinate";
import {left} from "./Algebra";
import {at} from "../util/ArrayUtils";

class Polygon {
  readonly coordinates: Coordinate[];

  constructor(coordinates: Coordinate[]) {
    this.coordinates = Polygon.counterClockwiseCoordinates(coordinates);
  }

  private static counterClockwiseCoordinates(coordinates: Coordinate[]) {
    let bottomRightVertex: number = 0;
    for (let i = 1; i < coordinates.length; ++i) {
      if (coordinates[i].y < coordinates[bottomRightVertex].y ||
        (coordinates[i].y == coordinates[bottomRightVertex].y && coordinates[i].x >
          coordinates[bottomRightVertex].x)) {
        bottomRightVertex = i;
      }
    }

    if (!left(
      at(coordinates, bottomRightVertex - 1),
      at(coordinates, bottomRightVertex),
      at(coordinates, bottomRightVertex + 1)
    )) {
      const result: Coordinate[] = [coordinates[0]];
      for (let i = coordinates.length - 1; i > 0; --i) {
        result.push(coordinates[i]);
      }

      return result;
    } else {
      return coordinates;
    }
  }
}

export {Polygon}
