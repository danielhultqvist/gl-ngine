import {KeilDecomposition} from "../../src/collisiondetection/KeilDecomposition";
import {Coordinate} from "../../src/geometry/Coordinate";
import {Polygon} from "../../src/geometry/Polygon";

test('get coordinate within range', () => {
  const coordinates: Coordinate[] = [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(3, 1),
  ];

  expect(KeilDecomposition.at(coordinates, 0)).toBe(coordinates[0]);
  expect(KeilDecomposition.at(coordinates, 1)).toBe(coordinates[1]);
  expect(KeilDecomposition.at(coordinates, 2)).toBe(coordinates[2]);
  expect(KeilDecomposition.at(coordinates, 3)).toBe(coordinates[3]);
});

test('get coordinate outside range with negative offset', () => {
  const coordinates: Coordinate[] = [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(3, 1),
  ];

  expect(KeilDecomposition.at(coordinates, -1)).toBe(coordinates[3]);
  expect(KeilDecomposition.at(coordinates, -3)).toBe(coordinates[1]);
  expect(KeilDecomposition.at(coordinates, -4)).toBe(coordinates[0]);
  expect(KeilDecomposition.at(coordinates, -6)).toBe(coordinates[2]);
  expect(KeilDecomposition.at(coordinates, -9)).toBe(coordinates[3]);
});

test('get coordinate outside range with positive offset', () => {
  const coordinates: Coordinate[] = [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(3, 1),
  ];

  expect(KeilDecomposition.at(coordinates, 1)).toBe(coordinates[1]);
  expect(KeilDecomposition.at(coordinates, 3)).toBe(coordinates[3]);
  expect(KeilDecomposition.at(coordinates, 4)).toBe(coordinates[0]);
  expect(KeilDecomposition.at(coordinates, 6)).toBe(coordinates[2]);
  expect(KeilDecomposition.at(coordinates, 7)).toBe(coordinates[3]);
  expect(KeilDecomposition.at(coordinates, 9)).toBe(coordinates[1]);
});

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
