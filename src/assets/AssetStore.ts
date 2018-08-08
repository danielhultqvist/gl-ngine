import {Asset} from "./Asset";

class AssetWithResource {
  asset: Asset;
  element: HTMLImageElement;

  constructor(asset: Asset, element: HTMLImageElement) {
    this.asset = asset;
    this.element = element;
  }
}

class AssetStore {
  private static assets: AssetWithResource[] = [];

  public static get(id: String): HTMLImageElement {
    for (let i = 0; i < this.assets.length; ++i) {
      if (this.assets[i].asset.id === id) {
        return this.assets[i].element;
      }
    }
    throw new Error(`Unable to find asset with id ${id}`);
  }

  public static put(asset: Asset, element: HTMLImageElement) {
    this.assets.push(new AssetWithResource(asset, element));
  }
}

export {AssetStore}
