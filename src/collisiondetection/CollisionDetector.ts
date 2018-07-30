import {MapObject} from "../map/MapObject";
import {Projection} from "../geometry/Projection";
import {Coordinate} from "../geometry/Coordinate";
import {Axis} from "../geometry/Axis";
import {Player} from "../player/Player";

class CollisionDetector {
  public collisionDetection(player: Player, mapObjects: Array<MapObject>): boolean {
    let anyCollision: boolean = false;
    mapObjects.map(o => {
      const testAxes: Array<Axis> = CollisionDetector.axes(o.coordinates);
      testAxes.push.apply(testAxes, CollisionDetector.axes(player.coordinates()));

      if (CollisionDetector.collidingAxis(testAxes, player, o)) {
        anyCollision = true;
      }
    });

    return anyCollision;
  }

  private static collidingAxis(axes: Array<Axis>, player: Player, obj: MapObject): boolean {
    for (let i = 0; i < axes.length; ++i) {
      const axis: Axis = axes[i];
      const normal: Axis = new Axis(-axis.dy, axis.dx);
      const playerProjection: Projection = CollisionDetector.project(normal, player.coordinates());
      const objectProjection: Projection = CollisionDetector.project(normal, obj.coordinates);

      if (!playerProjection.overlap(objectProjection)) {
        return false;
      }
    }
    return true;
  }

  private static project(normal: Axis, coordinates: Array<Coordinate>): Projection {
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

  private static axes(coordinates: Array<Coordinate>): Array<Axis> {
    const result = [];
    for (let i = 0; i < coordinates.length - 1; ++i) {
      result.push(
        new Axis(
          coordinates[i].x - coordinates[i + 1].x,
          coordinates[i].y - coordinates[i + 1].y)
      );
    }
    result.push(
      new Axis(
        coordinates[coordinates.length - 1].x - coordinates[0].x,
        coordinates[coordinates.length - 1].y - coordinates[0].y)
    );

    return result;
  }
}

export {CollisionDetector}
