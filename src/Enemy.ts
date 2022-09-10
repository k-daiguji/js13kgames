class Enemy extends Character {
  imagePath: string;
  target: Character;

  constructor(
    radius: number,
    speed: number,
    imagePath: string,
    target: Character,
    map: GameMap,
    row: number,
    col: number
  ) {
    super(radius, speed, map, row, col);
    this.imagePath = imagePath;
    this.target = target;
  }

  decideDirection(): void {
    if (Math.random() < 0.5) {
      if (this.target.getCx() - this.getCx() < 0) {
        this.nextMovingDirection.x = -1;
      } else {
        this.nextMovingDirection.x = 1;
      }
      this.nextMovingDirection.y = 0;
    } else {
      this.nextMovingDirection.x = 0;
      if (this.target.getCy() - this.getCy() < 0) {
        this.nextMovingDirection.y = -1;
      } else {
        this.nextMovingDirection.y = 1;
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
  killTarget() {
    if (
      this.getDistance(this.target) <= Math.max(this.radius, this.target.radius)
    ) {
      this.target.die();
    }
  }
}
