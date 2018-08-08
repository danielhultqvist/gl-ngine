import {Asset} from "./Asset";
import {AssetStore} from "./AssetStore";

class AssetLoader {

  public static load(assets: Asset[], callback: () => void) {
    console.log("START: Loading assets");
    let resourcesLoaded = 0;
    const checkReadyToLaunch = () => {
      resourcesLoaded += 1;
      if (resourcesLoaded === assets.length) {
        console.log("DONE: Assets loaded, starting game");
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
