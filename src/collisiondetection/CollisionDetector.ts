import {MapObject} from "../map/MapObject";
import {Projection} from "../geometry/Projection";
import {Coordinate} from "../geometry/Coordinate";
import {Axis} from "../geometry/Axis";
import {Player} from "../player/Player";
import {Polygon} from "../geometry/Polygon";
import {CollisionVector} from "./CollisionVector";

function axes(coordinates: Coordinate[]): Axis[] {
  const result: Axis[] = [];
  for (let i = 0; i < coordinates.length - 1; ++i) {
    result.push(new Axis(
      coordinates[i].x - coordinates[(i + 1) % coordinates.length].x,
      coordinates[i].y - coordinates[(i + 1) % coordinates.length].y
    ));
  }
  return result;
}

function collidingAxis(axes: Axis[], player: Player, polygon: Polygon): CollisionVector | null {
  let minOverlap: number = Number.MAX_VALUE;
  let overlappingAxis: Axis = new Axis(-1, -1);

  const playerCenter = player.getCenter();
  const polygonCenter = polygon.getCenter();

  for (let i = 0; i < axes.length; ++i) {
    const axis: Axis = axes[i];
    const normal: Axis = new Axis(-axis.dy, axis.dx).normalized();
    const playerProjection: Projection = project(normal, player.hitbox());
    const objectProjection: Projection = project(normal, polygon.coordinates);

    if (playerProjection.overlap(objectProjection)) {
      let overlap: number = playerProjection.getOverlap(objectProjection);

      if (playerProjection.contains(objectProjection)
        || objectProjection.contains(playerProjection)) {
        const max: number = Math.abs(playerProjection.max - objectProjection.max);
        const min: number = Math.abs(playerProjection.min - objectProjection.min);
        overlap += max > min ? min : max;
      }

      if (overlap < minOverlap) {
        minOverlap = overlap;
        overlappingAxis = normal;
      }
    } else {
      return null;
    }
  }

  let tmpAxis = overlappingAxis;
  const line = new Axis(playerCenter.x - polygonCenter.x, playerCenter.y - polygonCenter.y);
  if (line.dot(tmpAxis) < 0) {
    tmpAxis = overlappingAxis.negate();
  }

  return new CollisionVector(<Axis>tmpAxis, minOverlap);
}

function project(normal: Axis, coordinates: Coordinate[]): Projection {
  let min: number = normal.dot(coordinates[0]);
  let max: number = min;

  for (let i = 1; i < coordinates.length; ++i) {
    const value: number = normal.dot(coordinates[i]);
    if (value < min) {
      min = value;
    } else if (value > max) {
      max = value;
    }
  }

  return new Projection(min, max);
}

class CollisionDetector {
  public detect(player: Player, mapObjects: MapObject[]): CollisionVector[] {
    const collisionVectors: CollisionVector[] = [];
    const playerAxes: Axis[] = axes(player.hitbox());

    mapObjects.map(o => {
      o.polygons.forEach(p => {
        const testAxes: Axis[] = axes(p.coordinates)
          .concat(playerAxes);
        const collisionVector = collidingAxis(testAxes, player, p);

        if (collisionVector != null) {
          collisionVectors.push(collisionVector);
        }
      });
    });

    return collisionVectors;
  }
}

export {CollisionDetector}
