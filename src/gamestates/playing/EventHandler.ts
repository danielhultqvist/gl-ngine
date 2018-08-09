import {KeyState} from "./KeyState";
import {Player} from "../../player/Player";

export function keyDownHandler(e: KeyboardEvent, state: KeyState, player: Player) {
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      state.left = true;
      break;
    case "ArrowUp":
      e.preventDefault();
      player.dy = -7;
      state.up = true;
      break;
    case "ArrowRight":
      e.preventDefault();
      state.right = true;
      break;
  }
}

export function keyUpHandler(e: KeyboardEvent, state: KeyState) {
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      state.left = false;
      break;
    case "ArrowUp":
      e.preventDefault();
      state.up = false;
      break;
    case "ArrowRight":
      e.preventDefault();
      state.right = false;
      break;
  }
}

export function click(e: MouseEvent, player: Player) {
  player.x = e.offsetX;
  player.y = e.offsetY;
  player.dx = 0;
  player.dy = 0;
  console.log(`Teleported to: (${e.offsetX}, ${e.offsetY})`);
}
