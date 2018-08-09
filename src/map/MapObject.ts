import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";
import {PolygonDecomposer} from "../collisiondetection/PolygonDecomposer";
import {Renderable} from "../rendering/Renderable";

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class MapObject implements Renderable {
  readonly polygons: Polygon[];
  readonly vertices: Coordinate[];
  readonly colors: string[];

  constructor(polygon: Polygon, decomposer: PolygonDecomposer) {
    this.polygons = decomposer.decompose(polygon);
    this.colors = this.polygons.map(_ => randomColor());
    this.vertices = polygon.coordinates;
  }

  public render(canvas: HTMLCanvasElement): void {
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#00c30f";
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i: number = 1; i < this.vertices.length; ++i) {
      ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    ctx.fill();
    ctx.restore();

    this.renderGrass(ctx);
  }

  private renderGrass(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    for (let i = 0; i < this.vertices.length; ++i) {
      if (this.vertices[i].x < this.vertices[(i + 1) % this.vertices.length].x) {
        ctx.beginPath();
        ctx.moveTo(this.vertices[i].x, this.vertices[i].y);
        ctx.lineTo(this.vertices[(i + 1) % this.vertices.length].x,
          this.vertices[(i + 1) % this.vertices.length].y);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#008e0b";
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}

export {MapObject}
