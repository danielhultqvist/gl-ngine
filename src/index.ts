import {KeyState} from "./keystate";

class Coordinate {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class MapObject {
  readonly coordinates: Array<Coordinate>;

  constructor(coordinates: Array<Coordinate>) {
    this.coordinates = coordinates;
  }
}

class Main {

  private static UPDATE_RATE: number = 1000 / 25;

  readonly player: Player;
  readonly objects: Array<MapObject>;

  collision: boolean = false;

  constructor() {
    this.player = new Player(25, 25, 2, 2);
    this.objects = [
      new MapObject([
        new Coordinate(50, 100),
        new Coordinate(150, 50),
        new Coordinate(250, 100),
        new Coordinate(250, 250),
        new Coordinate(50, 250),
      ]),
      // new MapObject([
      //   new Coordinate(50, 100),
      //   new Coordinate(200, 125),
      //   new Coordinate(250, 175),
      //   new Coordinate(300, 175),
      //   new Coordinate(400, 100),
      //   new Coordinate(400, 200),
      //   new Coordinate(50, 200),
      // ]),
      // new MapObject([
      //   new Coordinate(400, 100),
      //   new Coordinate(600, 125),
      //   new Coordinate(650, 175),
      //   new Coordinate(700, 175),
      //   new Coordinate(800, 100),
      //   new Coordinate(800, 200),
      //   new Coordinate(400, 200),
      // ])
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

    this.collision = this.collisionDetection();
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

  private static drawMap(ctx: CanvasRenderingContext2D, objects: Array<MapObject>): void {
    objects.map(o => {
      ctx.beginPath();
      ctx.fillStyle = "#00FF00";
      ctx.moveTo(o.coordinates[0].x, o.coordinates[0].y);
      for (let i: number = 1; i < o.coordinates.length; ++i) {
        ctx.lineTo(o.coordinates[i].x, o.coordinates[i].y);
      }
      ctx.fill();
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

  private collisionDetection(): boolean {
    let anyCollision: boolean = false;
    this.objects.map(o => {
      const testAxes: Array<Axis> = Main.axes(o.coordinates);
      testAxes.push.apply(testAxes, Main.axes(this.player.coordinates()));

      if (this.collidingAxis(testAxes, o)) {
        anyCollision = true;
      }
    });

    return anyCollision;
  }

  private collidingAxis(axes: Array<Axis>, obj: MapObject): boolean {
    for (let i = 0; i < axes.length; ++i) {
      const axis: Axis = axes[i];
      const normal = new Axis(-axis.dy, axis.dx);
      const playerProjection: Projection = Main.project(normal, this.player.coordinates());
      const objectProjection: Projection = Main.project(normal, obj.coordinates);

      if (!playerProjection.overlap(objectProjection)) {
        return false;
      }
    }
    return true;
  }

  private static project(normal: Axis, coordinates: Array<Coordinate>): Projection {
    let min: number = normal.dot(coordinates[0]);
    let max: number = min;

    for (let i = 1; i < coordinates.length; ++i) {
      const value: number = normal.dot(coordinates[i]);
      if (value < min) {
        min = value;
      } else if (value > max) {
        max = value;
      }
    }

    return new Projection(min, max);
  }

  private static axes(coordinates: Array<Coordinate>): Array<Axis> {
    const result = [];
    for (let i = 0; i < coordinates.length - 1; ++i) {
      result.push(
        new Axis(
          coordinates[i].x - coordinates[i + 1].x,
          coordinates[i].y - coordinates[i + 1].y)
      );
    }
    result.push(
      new Axis(
        coordinates[coordinates.length - 1].x - coordinates[0].x,
        coordinates[coordinates.length - 1].y - coordinates[0].y)
    );

    return result;
  }

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

class Projection {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  overlap(projection: Projection): boolean {
    return Math.min(this.max, projection.max) - Math.max(this.min, projection.min) > 0;
  }
}

class Player {
  x: number;
  y: number;
  dx: number;
  dy: number;

  keyState: KeyState = new KeyState();

  readonly width: number = 20;
  readonly height: number = 50;

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  public coordinates(): Array<Coordinate> {
    return [
      new Coordinate(this.x, this.y),
      new Coordinate(this.x + this.width, this.y),
      new Coordinate(this.x + this.width, this.y + this.height),
      new Coordinate(this.x, this.y + this.height),
    ];
  }
}

class Axis {
  dx: number;
  dy: number;

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }

  dot(point: Coordinate) {
    return this.dx * point.x + this.dy * point.y;
  }
}

new Main().start();
