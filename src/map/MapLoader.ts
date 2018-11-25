import {Map} from "./Map";
import {PolygonDecomposer} from "../collisiondetection/PolygonDecomposer";
import {KeilDecomposer} from "../collisiondetection/KeilDecomposer";
import {Log} from "../util/Log";

class MapLoader {

  public static load(mapBuilder: (decomposer: PolygonDecomposer) => Map): Map {
    Log.log("START: Loading map");
    const before: number = new Date().getTime() / 1000;
    const decomposer: PolygonDecomposer = new KeilDecomposer();
    const map = mapBuilder(decomposer);
    const after: number = new Date().getTime() / 1000;
    Log.log(`DONE: Loading map. Processing time: ${after - before} ms`);
    return map;
  }
}

export {MapLoader}
