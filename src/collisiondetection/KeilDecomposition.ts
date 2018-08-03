import {PolygonDecompositor} from "./PolygonDecompositor";
import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";
import {leftOn, right, rightOn} from "../geometry/Algebra";
import {Line} from "../geometry/Line";
import {at} from "../util/ArrayUtils";

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
    if (leftOn(at(coordinates, a + 1), at(coordinates, a), at(coordinates, b)) &&
      rightOn(at(coordinates, a - 1), at(coordinates, a), at(coordinates, b))) {
      return false;
    }

    const dist: number = at(coordinates, a).distance(at(coordinates, b));
    for (let i = 0; i < coordinates.length; ++i) {
      if ((i + 1) % coordinates.length == a || i == a) {// ignore incident edges
        continue;
      }
      if (leftOn(at(coordinates, a), at(coordinates, b), at(coordinates, i + 1)) &&
        rightOn(at(coordinates, a), at(coordinates, b), at(coordinates, i))) {
        const lineA = new Line(at(coordinates, a), at(coordinates, b));
        const lineB = new Line(at(coordinates, i), at(coordinates, i + 1));
        const intersection: Coordinate = lineA.intersection(lineB);

        if (intersection.distance(at(coordinates, a)) < dist) {
          return false;
        }
      }
    }
    return true;
  }

  public static isReflex(coordinates: Coordinate[], indexToTest: number): boolean {
    let a: Coordinate = at(coordinates, indexToTest - 1);
    let b: Coordinate = coordinates[indexToTest];
    let c: Coordinate = at(coordinates, indexToTest + 1);
    return right(a, b, c);
  }

  private static dedup(polygons: Polygon[]): Polygon[] {
    return polygons;
  }
}

export {KeilDecomposition}
