import {Player} from "../player/Player";

class Gravity {
  static readonly MAX_VELOCITY = 10;
  static readonly REFRESH_RATE = 0.12; // TODO [dh] This constant should be injected

  public static apply(player: Player) {
    const newSpeed: number = 9.82 * Gravity.REFRESH_RATE;
    player.dy += newSpeed > Gravity.MAX_VELOCITY ? Gravity.MAX_VELOCITY : newSpeed;
  }
}

export {Gravity}
