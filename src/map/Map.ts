import {MapObject} from "./MapObject";
import {Renderable} from "../rendering/Renderable";
import {AssetStore} from "../assets/AssetStore";
import {RenderContext} from "../rendering/RenderContext";

class Map implements Renderable {
  readonly objects: MapObject[];
  readonly width: number;
  readonly height: number;

  constructor(objects: MapObject[], width: number, height: number) {
    this.objects = objects;
    this.width = width;
    this.height = height;
  }

  public render(renderContext: RenderContext): void {
    renderContext.clear();
    renderContext.drawFullImage(AssetStore.get("map-layers-1"));
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
