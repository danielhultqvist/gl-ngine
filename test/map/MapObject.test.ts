import {MapObject} from "../../src/map/MapObject";
import {PolygonDecompositor} from "../../src/collisiondetection/PolygonDecompositor";
import {Polygon} from "../../src/geometry/Polygon";
import {Coordinate} from "../../src/geometry/Coordinate";

test('MapObject should contain both vertices and decomposed polygons', () => {
  const polygon = new Polygon([
    new Coordinate(10, 10),
    new Coordinate(20, 10),
    new Coordinate(20, 20),
    new Coordinate(10, 20),
  ]);
  const decomposedPolygons = [
    new Polygon([
      new Coordinate(10, 10),
      new Coordinate(15, 10),
      new Coordinate(15, 20),
      new Coordinate(10, 10)
    ]),
    new Polygon([
      new Coordinate(15, 10),
      new Coordinate(20, 10),
      new Coordinate(20, 20),
      new Coordinate(15, 10)
    ]),
  ];

  const decomposer: PolygonDecompositor = new FakeDecomposer(decomposedPolygons);
  const mapObject = new MapObject(polygon, decomposer);

  expect(mapObject.polygons).toEqual(decomposedPolygons);
  expect(mapObject.vertices).toEqual(polygon.coordinates);
});

class FakeDecomposer implements PolygonDecompositor {
  readonly decomposedPolygons: Polygon[];

  constructor(decomposedPolyfons: Polygon[]) {
    this.decomposedPolygons = decomposedPolyfons;
  }

  split(_: Polygon): Polygon[] {
    return this.decomposedPolygons;
  }
}
