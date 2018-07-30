import {PolygonDecompositor} from "./PolygonDecompositor";
import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";
import {leftOn, right, rightOn} from "../math/Algebra";
import {Line} from "../geometry/Line";

class KeilDecomposition implements PolygonDecompositor {

  split(polygon: Polygon): Polygon[] {
    const convexPolygons = this.decompose(polygon);
    return KeilDecomposition.dedup(convexPolygons);
  }

  private decompose(polygon: Polygon): Polygon[] {
    let min: Polygon[] = [polygon];
    let minNumberOfPolygons: number = Number.MAX_VALUE;

    const coordinates: Coordinate[] = polygon.coordinates;
    for (let i: number = 0; i < coordinates.length; ++i) {
      if (KeilDecomposition.isReflex(coordinates, i)) {
        for (let j: number = 0; j < coordinates.length; ++j) {
          if (KeilDecomposition.verticesCanSeeEachOther(coordinates, i, j)) {
            const leftPolygon = KeilDecomposition.polygonForInclusiveRange(coordinates, i, j);
            const rightPolygon = KeilDecomposition.polygonForInclusiveRange(coordinates, j, i);
            const allPolygons: Polygon[] = this.decompose(leftPolygon)
              .concat(this.decompose(rightPolygon));

            if (allPolygons.length < minNumberOfPolygons) {
              min = allPolygons;
              minNumberOfPolygons = allPolygons.length;
            }
          }
        }
      }
    }

    return min;
  }

  public static polygonForInclusiveRange(coordinates: Coordinate[],
    start: number,
    end: number
  ): Polygon {
    const result: Coordinate[] = [];
    for (let i = 0; i < coordinates.length; ++i) {
      if (start < end) {
        if (i >= start && i <= end) {
          result.push(coordinates[i]);
        }
      } else {
        if (i >= start || i <= end) {
          result.push(coordinates[i]);
        }
      }
    }
    return new Polygon(result);
  }

  private static verticesCanSeeEachOther(coordinates: Coordinate[], a: number, b: number): boolean {
    if (leftOn(this.at(coordinates, a + 1), this.at(coordinates, a), this.at(coordinates, b)) &&
      rightOn(this.at(coordinates, a - 1), this.at(coordinates, a), this.at(coordinates, b))) {
      return false;
    }

    const dist: number = KeilDecomposition.distance(this.at(coordinates, a), this.at(coordinates, b));
    for (let i = 0; i < coordinates.length; ++i) {
      if ((i + 1) % coordinates.length == a || i == a) {// ignore incident edges
        continue;
      }
      if (leftOn(this.at(coordinates, a), this.at(coordinates, b), this.at(coordinates, i + 1)) &&
        rightOn(this.at(coordinates, a), this.at(coordinates, b), this.at(coordinates, i))) {
        const lineA = new Line(this.at(coordinates, a), this.at(coordinates, b));
        const lineB = new Line(this.at(coordinates, i), this.at(coordinates, i + 1));
        const p: Coordinate = lineA.intersection(lineB);

        if (KeilDecomposition.distance(this.at(coordinates, a), p) < dist) {
          return false;
        }
      }
    }
    return true;
  }

  private static distance(a: Coordinate, b: Coordinate): number {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
  }

  public static isReflex(coordinates: Coordinate[], indexToTest: number): boolean {
    let a: Coordinate = KeilDecomposition.at(coordinates, indexToTest - 1);
    let b: Coordinate = coordinates[indexToTest];
    let c: Coordinate = KeilDecomposition.at(coordinates, indexToTest + 1);
    return right(a, b, c);
  }

  public static at(coordinates: Coordinate[], index: number): Coordinate {
    if (index < 0) {
      const offset = (-index) % coordinates.length;
      if (offset == 0) {
        return coordinates[0]
      }
      return coordinates[coordinates.length - offset];
    } else if (index >= coordinates.length) {
      const offset = index % coordinates.length;
      return coordinates[offset];
    }
    return coordinates[index]
  }

  private static dedup(polygons: Polygon[]): Polygon[] {
    return polygons;
  }
}

export {KeilDecomposition}
