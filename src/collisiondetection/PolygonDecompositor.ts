import {Polygon} from "../geometry/Polygon";

interface PolygonDecompositor {
  decompose(polygon: Polygon): Array<Polygon>;
}

export {PolygonDecompositor}