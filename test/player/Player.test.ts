import {Player} from "../../src/player/Player";
import {Coordinate} from "../../src/geometry/Coordinate";

test('calculate player coordinates', () => {
  const player = new Player(10, 25, 0, 0);

  expect(player.coordinates()).toEqual([
    new Coordinate(10, 25),
    new Coordinate(10 + player.width, 25),
    new Coordinate(10 + player.width, 25 + player.height),
    new Coordinate(10, 25 + player.height),
  ]);
});