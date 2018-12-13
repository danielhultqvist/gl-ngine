import {Player} from "../../src/player/Player";
import {Coordinate} from "../../src/geometry/Coordinate";

test('calculate player hitbox', () => {
  const player = new Player(10, 25, 0, 0, "username");

  expect(player.hitbox())
    .toEqual([
      new Coordinate(10 + 8, 25 + 5),
      new Coordinate(10 + player.width - 8, 25 + 5),
      new Coordinate(10 + player.width - 8, 25 + player.height - 5),
      new Coordinate(10 + 8, 25 + player.height - 5),
    ]);
});
