import {KeyState} from "./keystate";

export function keyDownHandler(e: KeyboardEvent, state: KeyState) {
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

export function click(e: MouseEvent) {
  console.log(`Coordinate: (${e.offsetX}, ${e.offsetY})`);
}
