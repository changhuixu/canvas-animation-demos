class Particle {
  public readonly color: string;
  private realease = false;
  public vx = 0;
  public vy = 0;

  constructor(public x: number, public y: number, public readonly radius = 4) {
    this.color = '#' + ((Math.random() * 0x949494 + 0xaaaaaa) | 0).toString(16);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.x += this.vx;
    this.y += this.vy;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  flyAwayWhenMouseOver(mousePosition: Position) {
    const dx = this.x - mousePosition.x;
    const dy = this.y - mousePosition.y;
    if (dx * dx + dy * dy < 400 && !this.realease) {
      this.realease = true;
      this.vx = Math.random() * 6 * 2 - 6;
      this.vy = Math.random() * 6 * 2 - 6;
    }
  }
}

class Position {
  constructor(public x: number, public y: number) {}
}

export class CandyText {
  private readonly ctx: CanvasRenderingContext2D;
  private raf: number;
  private mousePosition = new Position(-100, -100);
  private particles: Particle[] = [];
  private readonly denseness = 10;
  private readonly textFont = '200px impact';
  private readonly textBackgroundColor = '#333';

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', e => {
      if (e.layerX || e.layerX == 0) {
        this.mousePosition.x = e.clientX - canvas.offsetLeft;
        this.mousePosition.y = e.clientY - canvas.offsetTop;
      }
    });

    this.canvas.addEventListener('mouseout', () => {
      window.cancelAnimationFrame(this.raf);
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
    this.clear();

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
    this.raf = window.requestAnimationFrame(() => this.animate());
  }

  private clear() {
    this.ctx.fillStyle = this.textBackgroundColor;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
  }

  private animate() {
    this.clear();
    this.particles.forEach(p => {
      p.flyAwayWhenMouseOver(this.mousePosition);
      p.draw(this.ctx);
    });
    this.raf = window.requestAnimationFrame(() => this.animate());
  }
}
