import GameMap from "./GameMap";
import { MainCharacter } from "./MainCharacter";
import { Enemy } from "./Enemy";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const Main = (): void => {
  canvas = document.getElementById("game_map") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const map: GameMap = new GameMap(0, 0, 30, 30, "#84C98B");
  const mainCharacter: MainCharacter = new MainCharacter(
    "main",
    10,
    80,
    "./dist/images/plant.png",
    map,
    1,
    1
  );
  const zebra: Enemy = new Enemy(
    "zebra",
    10,
    60,
    "./dist/images/zebra.png",
    [mainCharacter],
    map,
    1,
    9
  );
  const zebra2: Enemy = new Enemy(
    "zebra2",
    10,
    60,
    "./dist/images/zebra.png",
    [mainCharacter],
    map,
    5,
    7
  );
  const lion: Enemy = new Enemy(
    "tiger",
    10,
    90,
    "./dist/images/lion.png",
    [zebra, zebra2],
    map,
    3,
    11
  );
  const lion2: Enemy = new Enemy(
    "tiger2",
    10,
    90,
    "./dist/images/lion.png",
    [zebra, zebra2],
    map,
    10,
    11
  );
  const person: Enemy = new Enemy(
    "person",
    10,
    50,
    "./dist/images/person_male.png",
    [lion, lion2],
    map,
    4,
    1
  );
  const person2: Enemy = new Enemy(
    "person2",
    10,
    50,
    "./dist/images/person_female.png",
    [lion, lion2],
    map,
    4,
    12
  );
  const joker: Enemy = new Enemy(
    "joker",
    10,
    120,
    "./dist/images/joker.png",
    [zebra, zebra2, lion, lion2, person, person2],
    map,
    8,
    13
  );
  let enemies: Enemy[] = [zebra, zebra2, lion, lion2, person, person2, joker];

  canvas.tabIndex = 1;
  canvas.onkeydown = (event): void => {
    event.preventDefault();
    switch (event.key) {
      case "Up":
      case "ArrowUp":
        mainCharacter.goMove(1);
        break;
      case "Down":
      case "ArrowDown":
        mainCharacter.goMove(2);
        break;
      case "Left":
      case "ArrowLeft":
        mainCharacter.goMove(3);
        break;
      case "Right":
      case "ArrowRight":
        mainCharacter.goMove(4);
        break;
    }
  };
  const playLoop = (duration: number): void => {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.stroke();
    map.draw(ctx);

    mainCharacter.move(duration);
    mainCharacter.draw(ctx);
    enemies.forEach((enemy): void => {
      enemy.move1(duration);
      enemy.killTarget();
      enemy.draw(ctx);
    });
  };
  let prevDrawTime = 0;
  const mainLoop = (timestamp: number): void => {
    const aliveEnemies: Enemy[] = [];
    enemies.forEach((enemy): void => {
      if (enemy.isAlive()) {
        aliveEnemies.push(enemy);
      }
    });
    enemies = aliveEnemies;
    if (mainCharacter.isAlive()) {
      mainCharacter.killTarget();
      const duration: number = timestamp - prevDrawTime;
      playLoop(duration);
      if (aliveEnemies.length === 1) {
        enemies.push(joker);
        console.log("hoge", enemies);
        alert("Clear!");
        window.location.reload();
      }
      prevDrawTime = timestamp;
      window.requestAnimationFrame(mainLoop);
    } else {
      alert("Game Over!");
      window.location.reload();
    }
  };
  window.requestAnimationFrame(mainLoop);
};

Main();
