let maze;

export function setupMaze(): number[][] {
  maze = new Maze(15, 15);
  maze.CreateMaze();
  return maze.getMap();
}

class Maze {
  path: number;
  wall: number;
  width: number;
  height: number;
  map: number[][];
  start: number[];

  constructor(width: number, height: number) {
    this.path = 1;
    this.wall = 0;
    this.width = width;
    this.height = height;
    if (this.width % 2 === 0) {
      this.width++;
    }
    if (this.height % 2 === 0) {
      this.height++;
    }
    this.map = Array.from(new Array(this.height), () =>
      new Array(this.width).fill(this.path)
    );
    this.start = [1, 1];
  }

  getMap(): number[][] {
    return this.map;
  }
  SetWall(): void {
    this.map.forEach((h: number[], y: number): void => {
      h.forEach((_, x: number): void => {
        this.map[y][x] = this.wall;
      });
    });
  }
  SetOuter(value: number): void {
    this.map.forEach((h: number[], y: number): void => {
      h.forEach((_, x: number): void => {
        if (!x || !y || x === this.width - 1 || y === this.height - 1) {
          this.map[y][x] = value;
        }
      });
    });
  }
  AddPath(): void {
    let count = 0;
    this.map.forEach((h: number[], y): void => {
      h.forEach((w: number, x): void => {
        if (!w) {
          count++;
        }
        if (count > 4) {
          this.map[y][x] = this.path;
          count = 0;
        }
      });
    });
  }
  CreateMaze() {
    this.SetWall();
    this.SetOuter(this.path);
    let stack = [];
    let point = this.start;
    stack.push(point);
    this.map[point[1]][point[0]] = this.path;
    while (true) {
      if (stack.length === 0) {
        break;
      }
      stack = shuffle(stack);
      point = stack.pop();
      while (true) {
        const directions = [];
        if (
          this.map[point[1] - 1][point[0]] === this.wall &&
          this.map[point[1] - 2][point[0]] === this.wall
        ) {
          directions.push(0);
        }
        if (
          this.map[point[1]][point[0] + 1] === this.wall &&
          this.map[point[1]][point[0] + 2] === this.wall
        ) {
          directions.push(1);
        }
        if (
          this.map[point[1] + 1][point[0]] === this.wall &&
          this.map[point[1] + 2][point[0]] === this.wall
        ) {
          directions.push(2);
        }
        if (
          this.map[point[1]][point[0] - 1] === this.wall &&
          this.map[point[1]][point[0] - 2] === this.wall
        ) {
          directions.push(3);
        }
        if (directions.length === 0) {
          break;
        }
        const direction =
          directions[Math.floor(Math.random() * directions.length)];

        switch (direction) {
          case 0:
            this.map[point[1] - 1][point[0]] = this.path;
            this.map[point[1] - 2][point[0]] = this.path;
            stack.push([point[0], point[1]]);
            point = [point[0], point[1] - 2];
            break;
          case 1:
            this.map[point[1]][point[0] + 1] = this.path;
            this.map[point[1]][point[0] + 2] = this.path;
            stack.push([point[0], point[1]]);
            point = [point[0] + 2, point[1]];
            break;
          case 2:
            this.map[point[1] + 1][point[0]] = this.path;
            this.map[point[1] + 2][point[0]] = this.path;
            stack.push([point[0], point[1]]);
            point = [point[0], point[1] + 2];
            break;
          case 3:
            this.map[point[1]][point[0] - 1] = this.path;
            this.map[point[1]][point[0] - 2] = this.path;
            stack.push([point[0], point[1]]);
            point = [point[0] - 2, point[1]];
            break;
        }
      }
    }
    this.AddPath();
    this.SetOuter(this.wall);
    return this.map;
  }
}

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
