import {Line} from "../../src/geometry/Line";
import {Coordinate} from "../../src/geometry/Coordinate";

test('normalize axis', () => {
  const line1: Line = new Line(new Coordinate(0, 2), new Coordinate(2, 0));
  const line2: Line = new Line(new Coordinate(0, 0), new Coordinate(2, 2));

  expect(line1.intersection(line2))
    .toEqual(new Coordinate(1, 1));
});

test('calculate length', () => {
  expect(new Line(new Coordinate(0, 0), new Coordinate(2, 0)).length())
    .toEqual(2);
  expect(new Line(new Coordinate(0, 0), new Coordinate(-2, 0)).length())
    .toEqual(2);
  expect(new Line(new Coordinate(0, 0), new Coordinate(0, 3)).length())
    .toEqual(3);
  expect(new Line(new Coordinate(0, 0), new Coordinate(0, -3)).length())
    .toEqual(3);
  expect(new Line(new Coordinate(0, 0), new Coordinate(3, 4)).length())
    .toEqual(5);
});
