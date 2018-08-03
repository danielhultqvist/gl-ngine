import {Coordinate} from "../../src/geometry/Coordinate";
import {Axis} from "../../src/geometry/Axis";

test('calculate dot product with positive numbers', () => {
  const axis: Axis = new Axis(10, 25);
  const coordinate: Coordinate = new Coordinate(15, 30);

  expect(axis.dot(coordinate)).toEqual(900);
});

test('calculate dot product with negative numbers', () => {
  const axis: Axis = new Axis(10, -25);
  const coordinate: Coordinate = new Coordinate(15, 30);

  expect(axis.dot(coordinate)).toEqual(-600);
});

test('normalize axis', () => {
  const axis: Axis = new Axis(3, 4);

  expect(axis.normalized()).toEqual(new Axis(0.6, 0.8));
});
