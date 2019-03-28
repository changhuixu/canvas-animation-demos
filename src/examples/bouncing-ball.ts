class Ball {
  /**
   * Creates a new Ball object
   * @param x the initial x position of the ball (relative to the top left corner of the Canvas). Default 100
   * @param y the initial y position of the ball (relative to the top right corner of the Canvas). Default 100
   * @param vx the initial velocity of the ball in the x direction. Default 5
   * @param vy the initial velocity of the ball in the y direction. Default 2
   * @param radius the radius of the ball. Default 25
   * @param color the color of the ball. Default 'blue'
   */
  constructor(
    public x = 100,
    public y = 100,
    private vx = 5,
    private vy = 2,
    private readonly radius = 25,
    private readonly color = 'blue'
  ) {}

  /**
   * Draws, colors, and fills a ball using the parameters given in the constructor
   * @param ctx the HTML Canvas's 2D rendering context
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    // Draws a ball
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();

    // Colors and fills the ball
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  /**
   * Recalculates the trajectory of the ball when it bounces.
   * 
   * @param canvasWidth width of the HTML Canvas
   * @param canvasHeight height of the HTML Canvas
   */
  bounce(canvasWidth: number, canvasHeight: number) {
    // Increments the ball's position using its velocity
    this.x += this.vx;
    this.y += this.vy;

    // Sets the new vertical velocity to (99% + 0.25) of the old vertical velocity
    this.vy *= 0.99;
    this.vy += 0.25;
    
    // If the ball would fly off the top of the screen in the next step, or if would sink below it...
    if (this.y + this.vy > canvasHeight || this.y + this.vy < 0) {
      // ...then reverse the direction of the ball's vertical velocity
      this.vy = -this.vy;
    }

    // If the ball would fly off to the left or right of the screen in the next step...
    if (this.x + this.vx > canvasWidth || this.x + this.vx < 0) {
      // ...then reverse the direction of the ball's horizontal velocity
      this.vx = -this.vx;
    }
  }
}

export class BouncingBall {
  private readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private readonly ball = new Ball(50, 50); // create a new ball with x and y 50 and other properties default

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    window.requestAnimationFrame(() => this.draw()); // start the animation when the window is ready
  }

  /**
   * Draw step of the animation
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // erase the old ball
    this.ball.draw(this.ctx); // draw the ball in the new position
    this.ball.bounce(this.canvasWidth, this.canvasHeight); // calculate the ball's new position
    window.requestAnimationFrame(() => this.draw()); // repeat the draw step when the window requests a frame
  }
}
