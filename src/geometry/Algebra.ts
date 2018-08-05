import {Coordinate} from "./Coordinate";
import {at} from "../util/ArrayUtils";

/**
 * Test if a coordinate is right side of a line between start and stop in a counter
 * clockwise coordinate system
 * @param start Start of line
 * @param testCoordinate Coordinate to test
 * @param stop End of line
 */
export function right(start: Coordinate, testCoordinate: Coordinate, stop: Coordinate): boolean {
  return determinant(start, testCoordinate, stop) < 0;
}

/**
 * Test if a coordinate is right side of a line or on it between start and stop in a counter
 * clockwise coordinate system
 * @param start Start of line
 * @param testCoordinate Coordinate to test
 * @param stop End of line
 */
export function rightOn(start: Coordinate, testCoordinate: Coordinate, stop: Coordinate): boolean {
  return determinant(start, testCoordinate, stop) <= 0;
}

/**
 * Test if a coordinate is left side of a line between start and stop in a counter
 * clockwise coordinate system
 * @param start Start of line
 * @param testCoordinate Coordinate to test
 * @param stop End of line
 */
export function left(start: Coordinate, testCoordinate: Coordinate, stop: Coordinate): boolean {
  return determinant(start, testCoordinate, stop) > 0;
}

/**
 * Test if a coordinate is left side of a line or on it between start and stop in a counter
 * clockwise coordinate system
 * @param start Start of line
 * @param testCoordinate Coordinate to test
 * @param stop End of line
 */
export function leftOn(start: Coordinate, testCoordinate: Coordinate, stop: Coordinate): boolean {
  return determinant(start, testCoordinate, stop) >= 0;
}

/**
 * Calculate the determinant (area) of a triangle based on two vectors in a counter clockwise
 * coordinate system. c must be after b which must be after a in the coordinate system
 * The coordinates are extended to homogenous coordinates which allows calculating the
 * determinant using
 * | a.x  a.y  1 |
 * | b.x  b.y  1 |
 * | c.x  C.y  1 |
 */
export function determinant(a: Coordinate, b: Coordinate, c: Coordinate): number {
  return 1 / 2 * (a.x * b.y + a.y * c.x + b.x * c.y - c.x * b.y - c.y * a.x - a.y * b.x);
}

/**
 * Determines wheter a vertex is a reflex point, i.e. minimum 180% internal angle (inside polygon)
 * @param {Coordinate[]} coordinates
 * @param {number} indexToTest
 * @returns {boolean}
 */
export function isReflex(coordinates: Coordinate[], indexToTest: number): boolean {
  return right(at(coordinates, indexToTest - 1),
    coordinates[indexToTest],
    at(coordinates, indexToTest + 1)
  );
}
