import {MapObject} from "../map/MapObject";
import {Projection} from "../geometry/Projection";
import {Coordinate} from "../geometry/Coordinate";
import {Axis} from "../geometry/Axis";
import {Player} from "../player/Player";
import {Polygon} from "../geometry/Polygon";
import {CollisionVector} from "./CollisionVector";

function axes(coordinates: Coordinate[]): Axis[] {
  const result: Axis[] = [
    new Axis(
      coordinates[coordinates.length - 1].x - coordinates[0].x,
      coordinates[coordinates.length - 1].y - coordinates[0].y
    )
  ];
  for (let i = 0; i < coordinates.length - 1; ++i) {
    result.push(new Axis(
      coordinates[i].x - coordinates[i + 1].x,
      coordinates[i].y - coordinates[i + 1].y
    ));
  }

  return result;
}

function collidingAxis(axes: Axis[], player: Player, polygon: Polygon): CollisionVector | null {
  let minOverlap: number = Number.MAX_VALUE;
  let overlappingAxis: Axis | null = null;

  for (let i = 0; i < axes.length; ++i) {
    const axis: Axis = axes[i];
    const normal: Axis = new Axis(-axis.dy, axis.dx).normalized();
    const playerProjection: Projection = project(normal, player.coordinates());
    const objectProjection: Projection = project(normal, polygon.coordinates);

    if (playerProjection.overlap(objectProjection)) {
      const overlap: number = playerProjection.getOverlap(objectProjection);

      if (overlap < minOverlap) {
        minOverlap = overlap;
        overlappingAxis = normal;
      }
    } else {
      return null;
    }
  }

  return new CollisionVector(<Axis>overlappingAxis, minOverlap);
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
    const playerAxes: Axis[] = axes(player.coordinates());

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
