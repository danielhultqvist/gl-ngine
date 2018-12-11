import {Polygon} from "../geometry/Polygon";

interface PolygonDecomposer {
  decompose(polygon: Polygon): Polygon[];
}

export {PolygonDecomposer}
