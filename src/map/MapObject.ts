import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";

class MapObject {
  readonly polygons: Array<Polygon>;
  readonly vertices: Array<Coordinate>;

  constructor(polygons: Array<Polygon>) {
    this.polygons = polygons;

    const vertices: Array<Coordinate> = [];
    polygons.forEach(polygon => {
      polygon.coordinates.forEach(coordinate => {
        vertices.push(coordinate);
      });
    });
    this.vertices = vertices;
  }
}

export {MapObject}
