class Particle {
  public readonly color: string;
  private flying = false;
  public vx = 0;
  public vy = 0;

  constructor(public x: number, public y: number, public readonly radius = 4) {
    this.color = '#' + ((Math.random() * 0x949494 + 0xaaaaaa) | 0).toString(16);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.flying) {
      this.x += this.vx;
      this.y += this.vy;
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  flyAwayWhenMouseOver(mousePosition: Position) {
    const dx = this.x - mousePosition.x;
    const dy = this.y - mousePosition.y;
    if (dx * dx + dy * dy < 400 && !this.flying) {
      this.flying = true;
      this.vx = Math.random() * 6 * 2 - 6;
      this.vy = Math.random() * 6 * 2 - 6;
    }
  }

  isInCanvas(canvasWidth: number, canvasHeight: number) {
    return !(
      this.x < -this.radius ||
      this.y < -this.radius ||
      this.x > canvasWidth + this.radius ||
      this.y > canvasHeight + this.radius
    );
  }
}

class Position {
  constructor(public x: number, public y: number) {}
}

export class CandyText {
  private readonly ctx: CanvasRenderingContext2D;
  private raf: number;
  private continueAnimating = true;
  private mousePosition = new Position(-100, -100);
  private particles: Particle[] = [];
  private readonly denseness = 10;
  private readonly textFont = '200px impact';
  private readonly textBackgroundColor = '#333';

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousemove', e => {
      this.calculateMouseRelativePositionInCanvas(e);
    });
    this.canvas.addEventListener('mouseenter', () => {
      this.raf = window.requestAnimationFrame(() => this.animate());
      this.continueAnimating = true;
    });
    this.canvas.addEventListener('mouseout', () => {
      window.cancelAnimationFrame(this.raf); 
      this.continueAnimating = false;  // stop animation when mouse out.
    });
  }

  draw(word: string = 'Candy') {
    this.ctx.font = this.textFont;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(word, 45, 220);
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.drawBackground();

    // iterate over all pixels - leaving density gaps
    for (let py = 0; py < this.canvas.height; py += this.denseness) {
      for (let px = 0; px < this.canvas.width; px += this.denseness) {
        const pixel = imageData.data[(px + py * this.canvas.width) * 4 - 1];
        //Pixel is black from being drawn on.
        if (pixel == 255) {
          const p = new Particle(px, py);
          this.particles.push(p);
        }
      }
    }
    this.animate();
  }

  private drawBackground() {
    this.ctx.fillStyle = this.textBackgroundColor;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
  }

  private animate() {
    if (!this.particles.length || !this.continueAnimating) {
      return; // return when nothing needs to animate
    }

    this.drawBackground();
    // clean particles are not in canvas to reduce computation
    this.particles = this.particles.filter(p =>
      p.isInCanvas(this.canvas.width, this.canvas.height)
    );
    this.particles.forEach(p => {
      p.flyAwayWhenMouseOver(this.mousePosition);
      p.draw(this.ctx);
    });

    window.requestAnimationFrame(() => this.animate());
  }

  private calculateMouseRelativePositionInCanvas(e: MouseEvent) {
    // Note: I have handled scroll effect
    this.mousePosition.x =
      e.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft) -
      this.canvas.offsetLeft;
    this.mousePosition.y =
      e.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop) -
      this.canvas.offsetTop;
  }
}
