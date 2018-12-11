import {Player} from "../player/Player";

class Gravity {
  private static readonly MAX_VELOCITY = 10;
  private static readonly GAME_GRAVITY = 2;

  public static apply(player: Player, updateStepSize: number) {
    const newSpeed: number = 9.82 * Gravity.GAME_GRAVITY *  updateStepSize;
    player.dy += newSpeed > Gravity.MAX_VELOCITY ? Gravity.MAX_VELOCITY : newSpeed;
  }
}

export {Gravity}
