class Ball {
  constructor(
    public x = 100,
    public y = 100,
    private vx = 5,
    private vy = 2,
    private readonly radius = 25,
    private readonly color = 'blue'
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  bounce(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy *= 0.99;
    this.vy += 0.25;

    if (this.y + this.vy > canvasHeight || this.y + this.vy < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx > canvasWidth || this.x + this.vx < 0) {
      this.vx = -this.vx;
    }
  }
}

export class BouncingBall {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;
  private readonly ball = new Ball(50, 50);

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    window.requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ball.draw(this.ctx);
    this.ball.bounce(this.canvasWidth, this.canvasHeight);
    window.requestAnimationFrame(() => this.draw());
  }
}
