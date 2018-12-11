import {Projection} from "../../src/geometry/Projection";

test('calculate overlapping projections', () => {
  const projection1: Projection = new Projection(10, 30);
  const projection2: Projection = new Projection(20, 40);

  const overlap: number = projection1.getOverlap(projection2);
  const overlaps: boolean = projection1.overlap(projection2);

  expect(overlap)
    .toEqual(10);
  expect(overlaps)
    .toBeTruthy();
});

test('determine that projections are not overlapping', () => {
  const projection1: Projection = new Projection(10, 20);
  const projection2: Projection = new Projection(30, 40);

  const overlaps: boolean = projection1.overlap(projection2);

  expect(overlaps)
    .toBeFalsy();
});
