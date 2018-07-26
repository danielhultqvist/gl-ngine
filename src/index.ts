import {KeyState} from "./keystate";

class Main {

  private static UPDATE_RATE: number = 1000 / 25;

  readonly player: Player;

  constructor() {
    this.player = new Player(25, 25, 2, 2);
  }

  public start(): void {
    this.listenToActions();

    setInterval(this.loop, Main.UPDATE_RATE);
  }

  private loop = () => {
    this.update();

    this.render();
  };

  private listenToActions() {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
  }

  private update() {
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
  }

  private render = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    Main.clear(canvas, ctx);

    Main.drawMap(ctx);

    Main.drawCharacter(ctx, this.player);
  };

  private static drawCharacter(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    console.log(player.x);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  private static drawMap(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#00FF00";
    ctx.moveTo(50, 100);
    ctx.lineTo(200, 125);
    ctx.lineTo(250, 175);
    ctx.lineTo(300, 175);
    ctx.lineTo(400, 100);
    ctx.lineTo(400, 200);
    ctx.lineTo(50, 200);
    ctx.fill();
  }

  private static clear(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private keyDownHandler = (e: KeyboardEvent) => {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
}

new Main().start();
