class MainCharacter extends Character {
  radius: number;
  theta: number;
  dTheta: number;

  constructor(
    radius: number,
    speed: number,
    theta: number,
    map: GameMap,
    row: number,
    col: number
  ) {
    super(radius, speed, map, row, col);
    this.radius = radius;
    this.theta = theta;
    this.dTheta = 3;
  }

  getTheta(): number {
    return this.theta;
  }
  chew(): number {
    console.log("theta", this.theta);
    if (this.theta >= 30 || this.theta <= 0) {
      this.dTheta *= -1;
    }
    this.theta += this.dTheta;
    return this.theta;
  }
  move1(duration: number): void {
    console.log("hoge");
    this.chew();
    this.move(duration);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    const img: HTMLImageElement = new Image();
    img.src = "./dist/resources/plant.png";
    ctx.drawImage(img, this.getCx(), this.getCy());
  }
}
