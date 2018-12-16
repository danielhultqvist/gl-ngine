import {Player} from "../../../player/Player";

class UpdatePlayerMessage {

  public static toJsonString(player: Player) {
    console.log(player.animationFrame);
    return JSON.stringify({
      messageType: "update-player", data: {
        position: {
          x: player.x,
          y: player.y
        },
        vector: {
          dx: player.dx,
          dy: player.dy
        },
        animationFrame: player.animationFrame,
        movementState: player.movementState,
        direction: player.direction
      }
    });
  }
}

export {UpdatePlayerMessage}
