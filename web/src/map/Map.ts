import {MapObject} from "./MapObject";
import {Renderable} from "../rendering/Renderable";
import {AssetStore} from "../assets/AssetStore";
import {RenderContext} from "../rendering/RenderContext";
import {Coordinate} from "../geometry/Coordinate";

class Boundary {
  topLeft: Coordinate;
  bottomRight: Coordinate;

  constructor(topLeft: Coordinate, bottomRight: Coordinate) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }
}

class Map implements Renderable {
  readonly boundary: Boundary;
  readonly objects: MapObject[];

  constructor(boundary: Boundary, objects: MapObject[]) {
    this.boundary = boundary;
    this.objects = objects;
  }

  public render(renderContext: RenderContext): void {
    renderContext.clear();

    renderContext.drawFullImage(AssetStore.get("map-layers-1"), 0, 0, 1024, 768);
    renderContext.drawFullImage(AssetStore.get("map-layers-2"), 0, 0, 1024, 768);
    renderContext.drawFullImage(AssetStore.get("map-layers-3"), 0, 0, 1024, 768);
    renderContext.drawFullImage(AssetStore.get("map-layers-4"), 0, 0, 1024, 768);

    this.objects.map(o => o.render(renderContext));
  }
}

export {Map, Boundary}
