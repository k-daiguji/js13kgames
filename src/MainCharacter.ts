class MainCharacter extends Character {
  imagePath: string;
  targets: Character[] | undefined;

  constructor(
    radius: number,
    speed: number,
    imagePath: string,
    map: GameMap,
    row: number,
    col: number
  ) {
    super(radius, speed, map, row, col);
    this.imagePath = imagePath;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const img: HTMLImageElement = new Image();
    img.src = this.imagePath;
    ctx.drawImage(img, this.getCx(), this.getCy());
  }
  setTarget(target: Character[]): void {
    this.targets = target;
  }
  killTarget() {
    if (this.targets) {
      this.targets.forEach((t: Character): void => {
        if (this.getDistance(t) <= Math.max(this.radius, t.radius)) {
          t.die();
        }
      });
    }
  }
}
