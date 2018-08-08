import {Map} from "./Map";
import {PolygonDecomposer} from "../collisiondetection/PolygonDecomposer";
import {KeilDecomposer} from "../collisiondetection/KeilDecomposer";

class MapLoader {

  public static load(mapBuilder: (decomposer: PolygonDecomposer) => Map): Map {
    console.log("START: Loading map");
    const before: number = new Date().getTime() / 1000;
    const decomposer: PolygonDecomposer = new KeilDecomposer();
    const map = mapBuilder(decomposer);
    const after: number = new Date().getTime() / 1000;
    console.log(`DONE: Loading map. Processing time: ${after - before} ms`);
    return map;
  }
}

export {MapLoader}
