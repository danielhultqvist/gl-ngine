import {MapObject} from "./MapObject";
import {Renderable} from "../rendering/Renderable";

class Map implements Renderable {
  readonly objects: MapObject[];

  constructor(objects: MapObject[]) {
    this.objects = objects;
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.objects.map(o => o.render(ctx));
  }
}

export {Map}
