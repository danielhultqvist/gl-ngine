import {Coordinate} from "../../src/geometry/Coordinate";
import {Polygon} from "../../src/geometry/Polygon";

test('hitbox should remain the same for already counter clockwise hitbox', () => {
  const polygon: Polygon = new Polygon([
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(0, 1),
  ]);

  expect(polygon.coordinates)
    .toEqual([
      new Coordinate(0, 0),
      new Coordinate(1, 0),
      new Coordinate(1, 1),
      new Coordinate(0, 1),
    ]);
});

test('hitbox should be reveresed for already clockwise hitbox', () => {
  const polygon: Polygon = new Polygon([
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(1, 0),
  ]);

  expect(polygon.coordinates)
    .toEqual([
      new Coordinate(0, 0),
      new Coordinate(1, 0),
      new Coordinate(1, 1),
      new Coordinate(0, 1),
    ]);
});
