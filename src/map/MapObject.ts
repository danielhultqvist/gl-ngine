import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";
import {KeilDecomposition} from "../collisiondetection/KeilDecomposition";

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class MapObject {
  readonly polygons: Polygon[];
  readonly vertices: Coordinate[];
  readonly colors: string[];

  constructor(polygons: Polygon[]) {
    const newPolygons: Polygon[] = [];
    const decomposer = new KeilDecomposition();

    polygons.forEach(p => {
      const splitPolygons = decomposer.split(p);
      newPolygons.push.apply(newPolygons, splitPolygons);
    });

    // this.polygons = polygons;
    this.polygons = newPolygons;

    let colors = [];
    for (let i = 0; i < newPolygons.length; ++i) {
      colors.push(randomColor());
    }
    this.colors = colors;

    const vertices: Coordinate[] = [];
    polygons.forEach(polygon => {
      polygon.coordinates.forEach(coordinate => {
        vertices.push(coordinate);
      });
    });
    this.vertices = vertices;
  }
}

export {MapObject}
