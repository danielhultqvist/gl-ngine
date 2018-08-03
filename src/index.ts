import {Coordinate} from "./geometry/Coordinate";
import {MapObject} from "./map/MapObject";
import {CollisionDetector} from "./collisiondetection/CollisionDetector";
import {Player} from "./player/Player";
import {Polygon} from "./geometry/Polygon";
import {KeilDecomposer} from "./collisiondetection/KeilDecomposer";
import {CollisionVector} from "./collisiondetection/CollisionVector";
import {PolygonDecomposer} from "./collisiondetection/PolygonDecomposer";

class Main {

  private static UPDATE_RATE: number = 1000 / 25;

  readonly player: Player;
  objects: MapObject[];

  collisionVectors: CollisionVector[] = [];
  collisionDetector: CollisionDetector = new CollisionDetector();
  renderPolygons: boolean = true;

  constructor() {
    this.player = new Player(325, 25, 2, 2);
    this.objects = Main.loadObjects();
  }

  private static loadObjects(): MapObject[] {
    console.log("START: Loading objects");
    const before: number = new Date().getTime() / 1000;
    const decomposer: PolygonDecomposer = new KeilDecomposer();
    const tmp = [
      new MapObject(new Polygon([
        new Coordinate(50, 50),
        new Coordinate(150, 50),
        new Coordinate(198, 93),
        new Coordinate(198, 124),
        new Coordinate(181, 135),
        new Coordinate(158, 141),
        new Coordinate(157, 159),
        new Coordinate(174, 169),
        new Coordinate(208, 175),
        new Coordinate(225, 196),
        new Coordinate(211, 217),
        new Coordinate(160, 220),
        new Coordinate(111, 224),
        new Coordinate(76, 207),
        new Coordinate(45, 179),
        new Coordinate(14, 143),
        new Coordinate(16, 100),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(147, 284),
        new Coordinate(207, 266),
        new Coordinate(180, 311),
        new Coordinate(222, 311),
        new Coordinate(271, 281),
        new Coordinate(228, 343),
        new Coordinate(273, 391),
        new Coordinate(202, 354),
        new Coordinate(141, 401),
        new Coordinate(168, 347),
        new Coordinate(88, 270),
      ]), decomposer),
    ];
    const after: number = new Date().getTime() / 1000;
    console.log(`DONE: Loading objects. Processing time: ${after - before} ms`);
    return tmp;
  }

  public start(): void {
    this.listenToActions();

    this.loop();
    console.log(Main.UPDATE_RATE);
    setInterval(this.loop, Main.UPDATE_RATE);
  }

  private loop = () => {
    this.update();

    this.render();
  };

  private listenToActions(): void {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener("click", this.click, false);
  }

  private update(): void {
    if (this.player.keyState.left) {
      this.player.x = this.player.x - this.player.dx;
    }
    if (this.player.keyState.right) {
      this.player.x = this.player.x + this.player.dx;
    }
    if (this.player.keyState.up) {
      this.player.y = this.player.y - this.player.dy;
    }
    if (this.player.keyState.down) {
      this.player.y = this.player.y + this.player.dy;
    }

    this.collisionVectors = this.collisionDetector.collisionDetection(this.player, this.objects);
    this.collisionVectors.forEach(v => {
      this.player.x = this.player.x + v.vector.dx * v.magnitude;
      this.player.y = this.player.y + v.vector.dy * v.magnitude;
    })
  }

  private render = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    Main.clear(canvas, ctx);

    this.drawMap(ctx, this.objects);

    Main.drawCharacter(ctx, this.player);

    this.drawCollision(ctx);
  };

  private static drawCharacter(ctx: CanvasRenderingContext2D, player: Player): void {
    ctx.save();
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  private drawMap(ctx: CanvasRenderingContext2D, objects: MapObject[]): void {
    objects.map(o => {
      ctx.save();

      if (this.renderPolygons) {
        for (let i: number = 0; i < o.polygons.length; ++i) {
          const polygon = o.polygons[i];
          ctx.beginPath();
          ctx.fillStyle = o.colors[i];
          ctx.moveTo(polygon.coordinates[0].x, polygon.coordinates[0].y);
          for (let i: number = 1; i < polygon.coordinates.length; ++i) {
            ctx.lineTo(polygon.coordinates[i].x, polygon.coordinates[i].y);
          }
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = "#00FF00";
        ctx.moveTo(o.vertices[0].x, o.vertices[0].y);
        for (let i: number = 1; i < o.vertices.length; ++i) {
          ctx.lineTo(o.vertices[i].x, o.vertices[i].y);
        }
        ctx.fill();
      }

      for (let i: number = 0; i < o.vertices.length; ++i) {
        if (KeilDecomposer.isReflex(o.vertices, i)) {
          ctx.fillStyle = "#7F5F3F";
        } else {
          ctx.fillStyle = "#0000FF";
        }
        ctx.beginPath();
        ctx.ellipse(o.vertices[i].x, o.vertices[i].y, 5, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  private static clear(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private keyDownHandler = (e: KeyboardEvent) => {
    if ([
      32,
      37,
      38,
      39,
      40
    ].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }

    // left
    if (e.keyCode == 37) {
      this.player.keyState.left = true;
    }
    // up
    if (e.keyCode == 38) {
      this.player.keyState.up = true;
    }
    // right
    if (e.keyCode == 39) {
      this.player.keyState.right = true;
    }
    // down
    if (e.keyCode == 40) {
      this.player.keyState.down = true;
    }
    if (e.key == "p") {
      this.renderPolygons = !this.renderPolygons;
    }
    if (e.key == "d") {
      this.objects[0].vertices.forEach(v => console.log(`new Coordinate(${v.x}, ${v.y}),`));
    }
    if (e.key == "c") {
      console.log(this.collisionVectors);
    }
    if (e.key == "i") {
      console.log(this.player.coordinates());
    }
  };

  private keyUpHandler = (e: KeyboardEvent) => {
    if ([
      32,
      37,
      38,
      39,
      40
    ].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }

    // left
    if (e.keyCode == 37) {
      this.player.keyState.left = false;
    }
    // up
    if (e.keyCode == 38) {
      this.player.keyState.up = false;
    }
    // right
    if (e.keyCode == 39) {
      this.player.keyState.right = false;
    }
    // down
    if (e.keyCode == 40) {
      this.player.keyState.down = false;
    }
  };

  private click = (e: MouseEvent) => {
    console.log(`Coordinate: (${e.offsetX}, ${e.offsetY})`);
  };

  private drawCollision(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.collisionVectors.length > 0) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "#FF0000";
      ctx.fillText("Collision detected", 350, 50);
    } else {
      ctx.font = "30px Arial";
      ctx.fillStyle = "#00FF00";
      ctx.fillText("No collision", 350, 50);
    }

    ctx.restore();
  }
}


new Main().start();
