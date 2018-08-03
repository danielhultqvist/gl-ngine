import {Polygon} from "../geometry/Polygon";

interface PolygonDecomposer {
  split(polygon: Polygon): Polygon[];
}

export {PolygonDecomposer}
