import {Polygon} from "../geometry/Polygon";

interface PolygonDecompositor {
  split(polygon: Polygon): Polygon[];
}

export {PolygonDecompositor}
