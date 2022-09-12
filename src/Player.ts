import GameMap from "./GameMap";
import { Character } from "./Character";

export class Player extends Character {
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

  draw(ctx: CanvasRenderingContext2D): void {
    const img: HTMLImageElement = new Image();
    img.src = this.imagePath;
    ctx.drawImage(img, this.getCx(), this.getCy());
  }
  goMove(direction: number): void {
    switch (direction) {
      case 1:
        this.nextDirection = { x: 0, y: -1 };
        break;
      case 2:
        this.nextDirection = { x: 0, y: 1 };
        break;
      case 3:
        this.nextDirection = { x: -1, y: 0 };
        break;
      case 4:
        this.nextDirection = { x: 1, y: 0 };
        break;
    }
  }
  setTarget(target: Character): void {
    this.targets.push(target);
  }
  killTarget(): void {
    if (!this.targets) return;
    this.targets.forEach((t: Character): void => {
      if (this.getDistance(t) <= Math.max(this.radius, t.radius)) {
        t.die();
      }
    });
  }
}
