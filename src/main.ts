import GameMap from "./GameMap";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import CharacterParams from "../dist/CharacterParams.json";

type character = {
  name: string;
  radius: number;
  speed: number;
  imgPath: string;
  target: string[];
};

const createEnemy = (map: GameMap, player: Player): Enemy[] => {
  const enemies: Enemy[] = [];
  Object.values(CharacterParams).forEach((c): void => {
    const enemy: Enemy = new Enemy(c.name, c.radius, c.speed, c.imgPath, map);
    enemies.push(enemy);
    enemies.forEach((e: Enemy): void => {
      if (c.target.includes(e.name)) {
        enemy.setTarget(e);
      } else if (c.target.includes(player.name)) {
        enemy.setTarget(player);
      }
    });
  });
  return enemies;
};

let first = true;
const Main = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  p: character
): void => {
  first = false;
  const map: GameMap = new GameMap(0, 0, 30, 30, "#84C98B");
  const player: Player = new Player(p.name, p.radius, p.speed, p.imgPath, map);
  let enemies: Enemy[] = createEnemy(map, player);
  enemies.forEach((e: Enemy): void => {
    if (p.target.includes(e.name)) {
      player.setTarget(e);
    }
  });
  let endFlag = false;

  canvas.tabIndex = 1;
  document.body.onkeydown = (e: KeyboardEvent): void => {
    e.preventDefault();
    switch (e.key) {
      case "Up":
      case "ArrowUp":
        player.goMove(1);
        break;
      case "Down":
      case "ArrowDown":
        player.goMove(2);
        break;
      case "Left":
      case "ArrowLeft":
        player.goMove(3);
        break;
      case "Right":
      case "ArrowRight":
        player.goMove(4);
        break;
      default:
        if (endFlag) {
          window.location.reload();
        }
        break;
    }
  };
  const playLoop = (duration: number): void => {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    map.draw(ctx);

    player.move(duration);
    player.draw(ctx);
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
    if (player.isAlive()) {
      player.killTarget();
      const duration: number = timestamp - prevDrawTime;
      playLoop(duration);
      if (aliveEnemies.length === 1) {
        enemies.push(aliveEnemies[0]);
        message(canvas, ctx, "Game Clear!", "#0000FF");
        endFlag = true;
        return;
      }
      prevDrawTime = timestamp;
      window.requestAnimationFrame(mainLoop);
    } else {
      message(canvas, ctx, "Game Over!", "#FF0000");
      endFlag = true;
      return;
    }
  };
  window.requestAnimationFrame(mainLoop);
};

const message = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  message: string,
  color: string
): void => {
  ctx.font = "48px serif";
  ctx.fillStyle = color;
  ctx.fillText(message, (canvas.width - 26 * message.length) / 2, 190);
  ctx.font = "36px serif";
  ctx.fillText("Press any key.", 115, 250);
};

const startScreen = (): void => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.setAttribute("width", "450");
  canvas.setAttribute("height", "450");
  canvas.style.marginLeft = "auto";
  canvas.style.marginRight = "auto";
  canvas.style.textAlign = "left";
  canvas.style.width = "450px";
  document.body.append(canvas);
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  ctx.beginPath();
  ctx.fillStyle = "#84C98B";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.stroke();
  title(canvas, ctx, "Apex Predator", "#FF00FF");

  Object.values(CharacterParams).forEach((c: character, i: number): void => {
    const img: HTMLImageElement = new Image();
    img.src = c.imgPath;
    img.onload = function () {
      ctx.drawImage(img, i * 30 + 135, 275);
    };
  });

  canvas.tabIndex = 1;
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!first) return;
    if (270 < y && y < 300) {
      if (135 < x && x <= 165) {
        Main(canvas, ctx, CharacterParams.grass);
      } else if (165 < x && x <= 195) {
        Main(canvas, ctx, CharacterParams.zebra);
      } else if (195 < x && x <= 225) {
        Main(canvas, ctx, CharacterParams.lion);
      } else if (225 < x && x <= 255) {
        Main(canvas, ctx, CharacterParams.person_male);
      } else if (255 < x && x <= 285) {
        Main(canvas, ctx, CharacterParams.person_female);
      } else if (285 < x && x <= 315) {
        Main(canvas, ctx, CharacterParams.reaper);
      }
    }
  });
};
const title = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  message: string,
  color: string
): void => {
  ctx.font = "48px serif";
  ctx.fillStyle = color;
  ctx.fillText(message, (canvas.width - 24 * message.length) / 2, 190);
  ctx.font = "36px serif";
  ctx.fillText("Click your character.", 60, 250);
};

startScreen();
