import GameMap from "./GameMap";
import { Character } from "./Character";

export class Enemy extends Character {
  imagePath: string;
  targets: Character[];

  constructor(
    name: string,
    radius: number,
    speed: number,
    imagePath: string,
    map: GameMap
  ) {
    super(name, radius, speed, map);
    this.imagePath = imagePath;
    this.targets = [];
  }

  decideDirection(): void {
    if (this.targets.some((t: Character): boolean => t.isAlive())) {
      this.targets.forEach((t: Character): void => {
        if (!t.isAlive()) return;
        if (Math.random() < 0.5) {
          t.getCx() - this.getCx() < 0
            ? (this.nextDirection.x = -1)
            : (this.nextDirection.x = 1);
          this.nextDirection.y = 0;
        } else {
          this.nextDirection.x = 0;
          t.getCy() - this.getCy() < 0
            ? (this.nextDirection.y = -1)
            : (this.nextDirection.y = 1);
        }
      });
    } else {
      if (Math.random() < 0.5) {
        Math.random() < 0.5
          ? (this.nextDirection.x = -1)
          : (this.nextDirection.x = 1);
        this.nextDirection.y = 0;
      } else {
        this.nextDirection.x = 0;
        Math.random() < 0.5
          ? (this.nextDirection.y = -1)
          : (this.nextDirection.y = 1);
      }
    }
  }
  move1(duration: number): void {
    this.decideDirection();
    this.move(duration);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    const img: HTMLImageElement = new Image();
    img.src = this.imagePath;
    ctx.drawImage(img, this.getCx(), this.getCy());
  }
  setTarget(target: Character): void {
    this.targets.push(target);
  }
  killTarget(): void {
    if (!this.targets) return;
    this.targets.forEach((t: Character): void => {
      if (!t.isAlive()) return;
      if (this.getDistance(t) <= Math.max(this.radius, t.radius)) {
        t.die();
        (document.getElementById("sound") as HTMLAudioElement)?.play();
      }
    });
  }
}
