import {MapObject} from "../map/MapObject";
import {Projection} from "../geometry/Projection";
import {Coordinate} from "../geometry/Coordinate";
import {Axis} from "../geometry/Axis";
import {Player} from "../player/Player";
import {Polygon} from "../geometry/Polygon";
import {CollisionVector} from "./CollisionVector";

class CollisionDetector {
  public collisionDetection(player: Player, mapObjects: MapObject[]): CollisionVector[] {
    let collisionVectors: CollisionVector[] = [];

    mapObjects.map(o => {
      o.polygons.forEach(p => {
        const testAxes: Axis[] = CollisionDetector.axes(p.coordinates);
        testAxes.push.apply(testAxes, CollisionDetector.axes(player.coordinates()));

        let collisionVector = CollisionDetector.collidingAxis(testAxes, player, p);
        if (collisionVector != null) {
          collisionVectors.push(collisionVector);
        }
      });
    });

    return collisionVectors;
  }

  private static collidingAxis(axes: Axis[],
    player: Player,
    polygon: Polygon
  ): CollisionVector | null {
    let minOverlap: number = Number.MAX_VALUE;
    let overlappingAxis: Axis | null = null;
    for (let i = 0; i < axes.length; ++i) {
      const axis: Axis = axes[i];
      const normal: Axis = new Axis(-axis.dy, axis.dx);
      const playerProjection: Projection = CollisionDetector.project(normal, player.coordinates());
      const objectProjection: Projection = CollisionDetector.project(normal, polygon.coordinates);

      if (!playerProjection.overlap(objectProjection)) {
        return null;
      } else {
        const overlap: number = playerProjection.getOverlap(objectProjection);

        if (overlap < minOverlap) {
          minOverlap = overlap;
          overlappingAxis = normal;
        }
      }
    }

    return new CollisionVector(<Axis>overlappingAxis, minOverlap);
  }

  private static project(normal: Axis, coordinates: Coordinate[]): Projection {
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

  private static axes(coordinates: Coordinate[]): Axis[] {
    const result = [];
    for (let i = 0; i < coordinates.length - 1; ++i) {
      result.push(new Axis(coordinates[i].x - coordinates[i + 1].x, coordinates[i].y -
        coordinates[i + 1].y));
    }
    result.push(new Axis(coordinates[coordinates.length - 1].x -
      coordinates[0].x, coordinates[coordinates.length - 1].y - coordinates[0].y));

    return result;
  }
}

export {CollisionDetector}
