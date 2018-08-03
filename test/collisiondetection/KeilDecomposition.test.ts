import {KeilDecomposition} from "../../src/collisiondetection/KeilDecomposition";
import {Coordinate} from "../../src/geometry/Coordinate";
import {Polygon} from "../../src/geometry/Polygon";

test('get child polygon within coordinate array range', () => {
  const coordinates: Coordinate[] = [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(3, 1),
    new Coordinate(4, 1),
    new Coordinate(5, 1),
  ];

  expect(KeilDecomposition.polygonForInclusiveRange(coordinates, 1, 4)).toEqual(new Polygon([
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(3, 1),
    new Coordinate(4, 1),
  ]))
});

test('get child polygon outside coordinate array range', () => {
  const coordinates: Coordinate[] = [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(3, 1),
    new Coordinate(4, 1),
    new Coordinate(5, 1),
  ];

  expect(KeilDecomposition.polygonForInclusiveRange(coordinates, 4, 1)).toEqual(new Polygon([
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(4, 1),
    new Coordinate(5, 1),
  ]))
});

test('split complex polygon into smaller convex polygons', () => {
  //   (0,0)     (2,0)
  //      |\      /|          |\            /|
  //      | \    / |          | \          / |
  //      |  \  /  |    ->    |  \        /  |
  //      |   \/   |          |   \      /   |
  //      | (1,1)  |          |    \      \  |
  //      |        |          |     \      \ |
  //      ----------          -------\      \|
  //   (0,2)      (2,2)
  const polygon = new Polygon([
    new Coordinate(0, 0),
    new Coordinate(1, 1),
    new Coordinate(2, 0),
    new Coordinate(2, 2),
    new Coordinate(0, 2),
  ]);

  const result: Polygon[] = new KeilDecomposition().split(polygon);

  expect(result).toEqual([
    new Polygon([
      new Coordinate(1, 1),
      new Coordinate(2, 0),
      new Coordinate(2, 2),
    ]),
    new Polygon([
      new Coordinate(0, 0),
      new Coordinate(1, 1),
      new Coordinate(2, 2),
      new Coordinate(0, 2),
    ]),
  ]);
});
