class Star {
  public x: number = 0;
  public y: number = 0;
  private vx: number = 0;
  private vy: number = 0;
  public readonly radius: number;

  constructor(config: Config) {
    this.vx = Math.random() < 0.5 ? -config.starVelocity : config.starVelocity;
    this.vy = Math.random() < 0.5 ? -config.starVelocity : config.starVelocity;
    this.radius = config.starRadius;
  }

  randomize(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx -= Math.random() * 0.5;
    this.vy -= Math.random() * 0.5;
  }

  move(canvasWidth: number, canvasHeight: number) {
    if (this.y < 0 || this.y > canvasHeight) {
      this.vx = this.vx;
      this.vy = -this.vy;
    } else if (this.x < 0 || this.x > canvasWidth) {
      this.vx = -this.vx;
      this.vy = this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
  }
}

export class Config {
  constructor(
    public starVelocity: number = 0.1,
    public starRadius: number = 1,
    public starColor: string = 'rgba(255, 255, 255, .5)'
  ) {
    if (starVelocity <= 0) {
      this.starVelocity = 0.1;
    }
    if (starRadius === 0) {
      this.starRadius = Math.random();
    }
    if (starRadius <= 0) {
      this.starRadius = 1;
    }
  }
}

export class Constellation {
  private readonly context: CanvasRenderingContext2D;
  private stars: Star[] = [];

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly config: Config = new Config()
  ) {
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = this.config.starColor;
  }

  drawStars(n: number) {
    for (let i = 0; i < n; i++) {
      const star = new Star(this.config);
      star.randomize(this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
      this.context.fill();
      this.stars.push(star);
    }
    window.requestAnimationFrame(() => this.animate());
  }

  private animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.stars.forEach(star => {
      star.move(this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
      this.context.fill();
    });
    window.requestAnimationFrame(() => this.animate());
  }
}
