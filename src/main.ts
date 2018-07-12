import { SolarSystem } from './examples/solar-system';
import { Clock } from './examples/clock';
import { BouncingBall } from './examples/bouncing-ball';

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById('solar-system');
  new SolarSystem(canvas);
  const canvas2 = <HTMLCanvasElement>document.getElementById('clock');
  new Clock(canvas2);
  const canvas3 = <HTMLCanvasElement>document.getElementById('bouncing-ball');
  new BouncingBall(canvas3);
}

main();
