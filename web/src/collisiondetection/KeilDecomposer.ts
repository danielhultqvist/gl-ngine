import {PolygonDecomposer} from "./PolygonDecomposer";
import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";
import {isReflex, leftOn, rightOn} from "../geometry/Algebra";
import {Line} from "../geometry/Line";
import {at, subarray} from "../util/ArrayUtils";

function lineIntersectsDiagonal(
  coordinates: Coordinate[],
  first: number,
  second: number,
  third: number
) {
  return leftOn(at(coordinates, first), at(coordinates, second), at(coordinates, third + 1)) &&
    rightOn(at(coordinates, first), at(coordinates, second), at(coordinates, third));
}

function incidentEdge(coordinates: Coordinate[], first: number, second: number) {
  return (first + 1) % coordinates.length == second || first == second;
}

function peakHidingVertex(coordinates: Coordinate[], first: number, second: number) {
  return leftOn(at(coordinates, first + 1), at(coordinates, first), at(coordinates, second)) &&
    rightOn(at(coordinates, first - 1), at(coordinates, first), at(coordinates, second));
}

class KeilDecomposer implements PolygonDecomposer {

  public decompose(polygon: Polygon): Polygon[] {
    const coordinates: Coordinate[] = polygon.coordinates;
    let min: Polygon[] = [polygon];
    let minNumberOfPolygons: number = Number.MAX_VALUE;

    for (let i: number = 0; i < coordinates.length; ++i) {
      if (isReflex(coordinates, i)) {
        for (let j: number = 0; j < coordinates.length; ++j) {
          if (KeilDecomposer.verticesCanSeeEachOther(coordinates, i, j)) {
            const allPolygons = this.decomposePolygon(coordinates, i, j);

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

  private decomposePolygon(coordinates: Coordinate[], first: number, second: number) {
    const leftPolygon = new Polygon(subarray(coordinates, first, second));
    const rightPolygon = new Polygon(subarray(coordinates, second, first));
    return this.decompose(leftPolygon)
      .concat(this.decompose(rightPolygon));
  }

  private static verticesCanSeeEachOther(coordinates: Coordinate[], a: number, b: number): boolean {
    if (peakHidingVertex(coordinates, a, b)) {
      return false;
    }

    const diagonal = new Line(at(coordinates, a), at(coordinates, b));
    const length: number = diagonal.length();

    for (let i = 0; i < coordinates.length; ++i) {
      if (lineIntersectsDiagonal(coordinates, a, b, i) && !incidentEdge(coordinates, i, a)) {
        const tmpLine = new Line(at(coordinates, i), at(coordinates, i + 1));
        const intersection: Coordinate = diagonal.intersection(tmpLine);

        if (intersection.distance(at(coordinates, a)) < length) {
          return false;
        }
      }
    }
    return true;
  }
}

export {KeilDecomposer}
