import {Asset} from "./Asset";
import {AssetStore} from "./AssetStore";
import {Log} from "../util/Log";

class AssetLoader {

  public static load(assets: Asset[], callback: () => void) {
    Log.log("START: Loading assets");
    let resourcesLoaded = 0;
    const checkReadyToLaunch = () => {
      resourcesLoaded += 1;
      if (resourcesLoaded === assets.length) {
        Log.log("DONE: Assets loaded, starting game");
        callback();
      }
    };

    assets.forEach(asset => {
      const image: HTMLImageElement = document.createElement("img");
      image.addEventListener("load", checkReadyToLaunch);
      image.id = asset.id;
      image.src = asset.url.toString();
      AssetStore.put(asset, image);
    });
  }
}

export {AssetLoader}
