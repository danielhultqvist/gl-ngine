import {Player} from "../../../player/Player";
import {Map} from "../../../map/Map";
import {CollisionDetector} from "../../../collisiondetection/CollisionDetector";

class CollisionHandler {

  public static handle(player: Player, map: Map, collisionDetector: CollisionDetector) {
    let bottomCollision: boolean = false;
    let topCollision: boolean = false;

    if (player.y > map.boundary.bottomRight.y - player.height) {
      player.y = map.boundary.bottomRight.y - player.height;
      player.dy = 0;
      bottomCollision = true;
    } else if (player.y < map.boundary.topLeft.y) {
      player.y = 0;
      player.dy = 0;
      bottomCollision = true;
    }
    if (player.x > map.boundary.bottomRight.x - player.width) {
      player.x = map.boundary.bottomRight.x - player.width;
      player.dx = 0;
    } else if (player.x < map.boundary.topLeft.x) {
      player.x = 0;
      player.dx = 0;
    }

    const collisionVectors = collisionDetector.detect(player, map.objects);

    let collisionDeltaX = 0;
    let collisionDeltaY = 0;
    collisionVectors.forEach(v => {
      collisionDeltaX += v.vector.dx * v.magnitude;
      collisionDeltaY += v.vector.dy * v.magnitude;
    });

    player.x = player.x + collisionDeltaX;
    player.y = player.y + collisionDeltaY;
    if (collisionDeltaY < -1e-8 && player.dy > 0) {
      bottomCollision = true;
    } else if (collisionDeltaY > 1e-8 && player.dy < 0) {
      topCollision = true;
    }
    return {bottomCollision, topCollision};
  }
}

export {CollisionHandler}
