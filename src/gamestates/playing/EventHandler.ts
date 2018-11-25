import {KeyState} from "./KeyState";
import {Player} from "../../player/Player";
import {Viewport} from "../../rendering/Viewport";
import {Log} from "../../util/Log";

export function keyDownHandler(e: KeyboardEvent, state: KeyState, player: Player) {
  switch (e.code) {
    case "ArrowLeft":
    case "KeyA":
      e.preventDefault();
      state.left = true;
      break;
    case "ArrowUp":
    case "Space":
    case "KeyW":
      e.preventDefault();
      player.dy = -7;
      state.up = true;
      break;
    case "ArrowRight":
    case "KeyD":
      e.preventDefault();
      state.right = true;
      break;
  }
}

export function keyUpHandler(e: KeyboardEvent, state: KeyState) {
  switch (e.code) {
    case "ArrowLeft":
    case "KeyA":
      e.preventDefault();
      state.left = false;
      break;
    case "ArrowUp":
    case "KeyW":
      e.preventDefault();
      state.up = false;
      break;
    case "ArrowRight":
    case "KeyD":
      e.preventDefault();
      state.right = false;
      break;
  }
}

export function mouseDownHandler(e: MouseEvent, player: Player, viewport: Viewport) {
  switch (e.button) {
    case 0:
      player.x = e.offsetX + viewport.x;
      player.y = e.offsetY + viewport.y;
      player.dx = 0;
      player.dy = 0;
      break;
    case 2:
      Log.log(`new Coordinate(${Math.round(e.offsetX + viewport.x)}, ${Math.round(e.offsetY + viewport.y)}),`);
      break;
  }
}
