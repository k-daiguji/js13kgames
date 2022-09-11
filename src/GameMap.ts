import { setupMaze } from "./GenerateMap";

type tile = { x: number; y: number; kind: number };
type tileLeftTop = { left: number; top: number };

export default class GameMap {
  x: number;
  y: number;
  tileSize: { width: number; height: number };
  wallFillStyle: string;
  map: number[][];

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    wallFillStyle: string
  ) {
    this.x = x;
    this.y = y;
    this.tileSize = { width, height };
    this.wallFillStyle = wallFillStyle;
    this.map = this.generateMap();
  }

  generateMap(): number[][] {
    return setupMaze();
  }
  getTileWidth(): number {
    return this.tileSize.width;
  }
  getTileHeight(): number {
    return this.tileSize.height;
  }
  getTile(width: number, height: number): tile {
    const x: number = Math.floor((width - this.x) / this.getTileWidth());
    const y: number = Math.floor((height - this.y) / this.getTileHeight());
    return { x, y, kind: this.map[y][x] };
  }
  getTileLeftTop(y: number, x: number): tileLeftTop {
    return {
      left: this.x + x * this.getTileWidth(),
      top: this.y + y * this.getTileHeight(),
    };
  }
  getTileCenter(x: number, y: number): { x: number; y: number } {
    const tile: tile = this.getTile(x, y);
    const leftTop: tileLeftTop = this.getTileLeftTop(tile.y, tile.x);
    return {
      x: Math.floor(leftTop.left + this.getTileWidth() / 2),
      y: Math.floor(leftTop.top + this.getTileHeight() / 2),
    };
  }
  canMoveLeft(x: number, y: number) {
    const tile: tile = this.getTile(x, y);
    return tile.x === 0 || this.map[tile.y][tile.x - 1] === 0;
  }
  canMoveUp(x: number, y: number): boolean {
    const tile: tile = this.getTile(x, y);
    return tile.y === 0 || this.map[tile.y - 1][tile.x] === 0;
  }
  canMoveRight(x: number, y: number): boolean {
    const tile: tile = this.getTile(x, y);
    return (
      tile.x + 1 === this.map[0].length || this.map[tile.y][tile.x + 1] === 0
    );
  }
  canMoveDown(x: number, y: number): boolean {
    const tile: tile = this.getTile(x, y);
    return tile.y + 1 === this.map.length || this.map[tile.y + 1][tile.x] === 0;
  }
  randomOnLoad(): { x: number; y: number } {
    let x = Math.floor(Math.random() * 15);
    let y = Math.floor(Math.random() * 15);
    while (!this.map[x][y]) {
      x = Math.floor(Math.random() * 15);
      y = Math.floor(Math.random() * 15);
    }
    return { x, y };
  }
  drawWall(ctx: CanvasRenderingContext2D, y: number, x: number): void {
    ctx.fillStyle = this.wallFillStyle;
    ctx.rect(
      this.x + x * this.getTileWidth(),
      this.y + y * this.getTileHeight(),
      this.getTileWidth(),
      this.getTileHeight()
    );
    ctx.fill();
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    this.map.forEach((y, i): void => {
      y.forEach((x, j): void => {
        if (!x) {
          this.drawWall(ctx, i, j);
        }
      });
    });
  }
}
