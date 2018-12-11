import {clampAbsolute} from "../../src/util/MathUtils";

test('clamp positive values', () => {
  expect(clampAbsolute(5, 2)).toBe(2);
  expect(clampAbsolute(5, 10)).toBe(5);
});

test('clamp negative values', () => {
  expect(clampAbsolute(5, -2)).toBe(-2);
  expect(clampAbsolute(5, -10)).toBe(-5);
});
