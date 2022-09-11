import GameMap from "./GameMap";

export class Character {
  name: string;
  radius: number;
  speed: number;
  map: GameMap;
  position: { x: number; y: number };
  direction: { x: number; y: number };
  nextDirection: { x: number; y: number };
  distance: number;
  alive: boolean;

  constructor(name: string, radius: number, speed: number, map: GameMap) {
    this.name = name;
    this.radius = radius;
    this.speed = speed;
    this.map = map;
    const leftTop = this.map.getTileLeftTop(
      Math.floor(Math.random() * 15),
      Math.floor(Math.random() * 15)
    );
    this.position = {
      x: Math.floor(leftTop.left + this.map.getTileWidth() / 2),
      y: Math.floor(leftTop.top + this.map.getTileHeight() / 2),
    };
    this.direction = { x: 0, y: 0 };
    this.nextDirection = { x: 0, y: 0 };
    this.distance = 0;
    this.alive = true;
  }

  getCx(): number {
    return this.position.x - 12;
  }
  getCy(): number {
    return this.position.y - 12;
  }
  getDistance(other: Character): number {
    return Math.sqrt(
      Math.pow(this.getCx() - other.getCx(), 2) +
        Math.pow(this.getCy() - other.getCy(), 2)
    );
  }
  getSpeed(): number {
    return this.speed;
  }
  isAlive(): boolean {
    return this.alive;
  }
  canMove() {
    if (this.nextDirection.x < 0) {
      return !this.map.canMoveLeft(this.position.x, this.position.y);
    } else if (this.nextDirection.x > 0) {
      return !this.map.canMoveRight(this.position.x, this.position.y);
    } else if (this.nextDirection.y < 0) {
      return !this.map.canMoveUp(this.position.x, this.position.y);
    } else if (this.nextDirection.y > 0) {
      return !this.map.canMoveDown(this.position.x, this.position.y);
    } else {
      return true;
    }
  }
  die(): void {
    this.alive = false;
  }
  move(duration: number): void {
    const distance: number = (duration * this.getSpeed()) / 1000;
    if (Boolean(this.direction.x)) {
      this.distance += distance;
      if (this.distance >= this.map.getTileWidth()) {
        this.distance = 0;
      } else {
        this.position.x += this.direction.x * distance;
        return;
      }
    } else if (Boolean(this.direction.y)) {
      this.distance += distance;
      if (this.distance >= this.map.getTileHeight()) {
        this.distance = 0;
      } else {
        this.position.y += this.direction.y * distance;
        return;
      }
    }

    this.position = this.map.getTileCenter(this.position.x, this.position.y);
    if (this.canMove()) {
      this.direction.x = this.nextDirection.x;
      this.direction.y = this.nextDirection.y;
    } else {
      this.nextDirection.x = this.direction.x;
      this.nextDirection.y = this.direction.y;
      this.direction = { x: 0, y: 0 };
    }
  }
}
