class MainCharacter extends Character {
  imagePath: string;
  targets: Character[] | undefined;

  constructor(
    name: string,
    radius: number,
    speed: number,
    imagePath: string,
    map: GameMap,
    x: number,
    y: number
  ) {
    super(name, radius, speed, map, x, y);
    this.imagePath = imagePath;
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
  setTarget(targets: Character[]): void {
    this.targets = targets;
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
