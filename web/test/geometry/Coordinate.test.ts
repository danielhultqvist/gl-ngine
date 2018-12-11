import {Coordinate} from "../../src/geometry/Coordinate";

test('return length between to hitbox', () => {
  expect(new Coordinate(0, 0).distance(new Coordinate(-3, -4)))
    .toEqual(5);
  expect(new Coordinate(0, 0).distance(new Coordinate(-3, 4)))
    .toEqual(5);
  expect(new Coordinate(0, 0).distance(new Coordinate(3, -4)))
    .toEqual(5);
  expect(new Coordinate(0, 0).distance(new Coordinate(3, 4)))
    .toEqual(5);

  expect(new Coordinate(0, 0).distance(new Coordinate(0, -6)))
    .toEqual(6);
  expect(new Coordinate(0, 0).distance(new Coordinate(0, 6)))
    .toEqual(6);
  expect(new Coordinate(0, 0).distance(new Coordinate(-7, 0)))
    .toEqual(7);
  expect(new Coordinate(0, 0).distance(new Coordinate(7, 0)))
    .toEqual(7);
});
