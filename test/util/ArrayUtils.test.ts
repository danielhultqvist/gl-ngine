import {at} from "../../src/util/ArrayUtils";

test('get coordinate within range', () => {
  const elements: number[] = [
    1,
    2,
    3,
    4
  ];

  expect(at(elements, 0))
    .toBe(elements[0]);
  expect(at(elements, 1))
    .toBe(elements[1]);
  expect(at(elements, 2))
    .toBe(elements[2]);
  expect(at(elements, 3))
    .toBe(elements[3]);
});

test('get coordinate outside range with negative offset', () => {
  const coordinates: number[] = [
    1,
    2,
    3,
    4
  ];

  expect(at(coordinates, -1))
    .toBe(coordinates[3]);
  expect(at(coordinates, -3))
    .toBe(coordinates[1]);
  expect(at(coordinates, -4))
    .toBe(coordinates[0]);
  expect(at(coordinates, -6))
    .toBe(coordinates[2]);
  expect(at(coordinates, -9))
    .toBe(coordinates[3]);
});

test('get coordinate outside range with positive offset', () => {
  const coordinates: number[] = [
    1,
    2,
    3,
    4
  ];

  expect(at(coordinates, 1))
    .toBe(coordinates[1]);
  expect(at(coordinates, 3))
    .toBe(coordinates[3]);
  expect(at(coordinates, 4))
    .toBe(coordinates[0]);
  expect(at(coordinates, 6))
    .toBe(coordinates[2]);
  expect(at(coordinates, 7))
    .toBe(coordinates[3]);
  expect(at(coordinates, 9))
    .toBe(coordinates[1]);
});
