import {Coordinate} from "../../src/geometry/Coordinate";
import {determinant, left, leftOn, right, rightOn} from "../../src/geometry/Algebra";

test('calculate determinant for counter clockwise hitbox', () => {
  const coordinate1: Coordinate = new Coordinate(0, 0);
  const coordinate2: Coordinate = new Coordinate(1, 0);
  const coordinate3: Coordinate = new Coordinate(0, 2);

  const det = determinant(coordinate1, coordinate2, coordinate3);

  expect(det)
    .toEqual(1);
});

test('calculate determinant for clockwise hitbox', () => {
  const coordinate1: Coordinate = new Coordinate(0, 0);
  const coordinate2: Coordinate = new Coordinate(0, 2);
  const coordinate3: Coordinate = new Coordinate(1, 0);

  const det = determinant(coordinate1, coordinate2, coordinate3);

  expect(det)
    .toEqual(-1);
});

test('point is on the right side of a line', () => {
  const start: Coordinate = new Coordinate(0, 0);
  const end: Coordinate = new Coordinate(0, 2);
  const testCoordinate: Coordinate = new Coordinate(-1, 1);

  expect(right(start, testCoordinate, end))
    .toBeTruthy();
  expect(left(start, testCoordinate, end))
    .toBeFalsy();
});

test('point is on the left side of a line', () => {
  const start: Coordinate = new Coordinate(0, 0);
  const end: Coordinate = new Coordinate(0, 2);
  const testCoordinate: Coordinate = new Coordinate(1, 1);

  expect(left(start, testCoordinate, end))
    .toBeTruthy();
  expect(right(start, testCoordinate, end))
    .toBeFalsy();
});

test('point is on the line', () => {
  const start: Coordinate = new Coordinate(0, 0);
  const end: Coordinate = new Coordinate(0, 2);
  const testCoordinate: Coordinate = new Coordinate(0, 1);

  expect(rightOn(start, testCoordinate, end))
    .toBeTruthy();
  expect(leftOn(start, testCoordinate, end))
    .toBeTruthy();
});
