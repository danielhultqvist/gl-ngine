import {KeyState} from "../states/KeyState";
import {Player} from "../../../player/Player";
import {Viewport} from "../../../rendering/Viewport";
import {Log} from "../../../util/Log";
import {MouseState} from "../states/MouseState";
import {Item} from "../../../spells/Item";
import {Fireball} from "../../../spells/Fireball";
import {Vector} from "../../../geometry/Vector";

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

export function mouseDownHandler(e: MouseEvent, player: Player, viewport: Viewport, items: Item[]) {
  const screenX = Math.round(e.offsetX + viewport.x);
  const screenY = Math.round(e.offsetY + viewport.y);
  switch (e.button) {
    case 0:
      Log.log(`Placing item at ${screenX}, ${screenY}`);
      items.push(
        new Fireball(
          player.x + player.width / 2,
          player.y + player.height / 2,
          new Vector(screenX - player.x, screenY - player.y).normalized()));
      break;
    case 1:
      player.x = screenX;
      player.y = screenY;
      player.dx = 0;
      player.dy = 0;
      break;
    case 2:
      Log.log(`new Coordinate(${screenX}, ${screenY}),`);
      break;
  }
}

export function mouseMoveHandler(e: MouseEvent, mouseState: MouseState) {
  mouseState.update(e.clientX, e.clientY);
}
