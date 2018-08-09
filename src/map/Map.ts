import {MapObject} from "./MapObject";
import {Renderable} from "../rendering/Renderable";
import {AssetStore} from "../assets/AssetStore";

class Map implements Renderable {
  readonly objects: MapObject[];

  constructor(objects: MapObject[]) {
    this.objects = objects;
  }

  public render(canvas: HTMLCanvasElement): void {
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(AssetStore.get("map-layers-1"), 0, 0, 1024, 768);
    ctx.drawImage(AssetStore.get("map-layers-2"), 0, 0, 1024, 768);
    ctx.drawImage(AssetStore.get("map-layers-3"), 0, 0, 1024, 768);
    ctx.drawImage(AssetStore.get("map-layers-4"), 0, 0, 1024, 768);
    ctx.restore();

    this.objects.map(o => o.render(canvas));
  }
}

export {Map}
