import {KeyState} from "./keystate";
import {Player} from "../player/Player";

export function keyDownHandler(e: KeyboardEvent, state: KeyState, player: Player) {
  if ([
    32,
    37,
    38,
    39,
    40
  ].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  // left
  if (e.keyCode == 37) {
    state.left = true;
  }
  // up
  if (e.keyCode == 38) {
    state.up = true;
    player.dy = -10;
  }
  // right
  if (e.keyCode == 39) {
    state.right = true;
  }
  // down
  if (e.keyCode == 40) {
    state.down = true;
  }
}

export function keyUpHandler(e: KeyboardEvent, state: KeyState) {
  if ([
    32,
    37,
    38,
    39,
    40
  ].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  // left
  if (e.keyCode == 37) {
    state.left = false;
  }
  // up
  if (e.keyCode == 38) {
    state.up = false;
  }
  // right
  if (e.keyCode == 39) {
    state.right = false;
  }
  // down
  if (e.keyCode == 40) {
    state.down = false;
  }
}

export function click(e: MouseEvent, player: Player) {
  player.x = e.offsetX;
  player.y = e.offsetY;
  player.dx = 0;
  player.dy = 0;
  console.log(`Teleported to: (${e.offsetX}, ${e.offsetY})`);
}
