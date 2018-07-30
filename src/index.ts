import {Coordinate} from "./geometry/Coordinate";
import {MapObject} from "./map/MapObject";
import {CollisionDetector} from "./collisiondetection/CollisionDetector";
import {Player} from "./player/Player";
import {Polygon} from "./geometry/Polygon";
import {KeilDecomposition} from "./collisiondetection/KeilDecomposition";


class Main {

  private static UPDATE_RATE: number = 1000 / 25;

  readonly player: Player;
  readonly objects: Array<MapObject>;

  collision: boolean = false;
  collisionDetector: CollisionDetector = new CollisionDetector();

  constructor() {
    this.player = new Player(25, 25, 2, 2);
    this.objects = [
      // new MapObject([
      //   new Polygon([
      //     new Coordinate(50, 100),
      //     new Coordinate(150, 50),
      //     new Coordinate(250, 100),
      //     new Coordinate(250, 250),
      //     new Coordinate(50, 250),
      //   ])]),
      new MapObject([
        new Polygon([
          new Coordinate(50, 100),
          new Coordinate(200, 125),
          new Coordinate(250, 175),
          new Coordinate(300, 175),
          new Coordinate(400, 100),
          new Coordinate(400, 200),
          new Coordinate(50, 200)
        ]),
      ]),
      new MapObject([
        new Polygon([
          new Coordinate(400, 100),
          new Coordinate(600, 125),
          new Coordinate(650, 175),
          new Coordinate(700, 175),
          new Coordinate(800, 100),
          new Coordinate(800, 200),
          new Coordinate(400, 200)
        ]),
      ])
    ];
  }

  public start(): void {
    this.listenToActions();

    setInterval(this.loop, Main.UPDATE_RATE);
  }

  private loop = () => {
    this.update();

    this.render();
  };

  private listenToActions(): void {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
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

    this.collision = this.collisionDetector.collisionDetection(this.player, this.objects);
  }

  private render = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    Main.clear(canvas, ctx);

    Main.drawMap(ctx, this.objects);

    Main.drawCharacter(ctx, this.player);

    Main.drawCollision(ctx, this.collision);
  };

  private static drawCharacter(ctx: CanvasRenderingContext2D, player: Player): void {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  // private static getRandomColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  private static drawMap(ctx: CanvasRenderingContext2D, objects: Array<MapObject>): void {
    objects.map(o => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#00FF00";
      ctx.moveTo(o.vertices[0].x, o.vertices[0].y);
      for (let i: number = 1; i < o.vertices.length; ++i) {
        ctx.lineTo(o.vertices[i].x, o.vertices[i].y);
      }
      ctx.fill();

      for (let i: number = 0; i < o.vertices.length; ++i) {
        if (KeilDecomposition.isReflex(o.vertices, i)) {
          ctx.fillStyle = "#000000";
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
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
  };

  private keyUpHandler = (e: KeyboardEvent) => {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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

  private static drawCollision(ctx: CanvasRenderingContext2D, collision: boolean): void {
    if (collision) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "#FF0000";
      ctx.fillText("Collision detected", 350, 50);
    } else {
      ctx.font = "30px Arial";
      ctx.fillStyle = "#00FF00";
      ctx.fillText("No collision", 350, 50);
    }
  }
}


new Main().start();
