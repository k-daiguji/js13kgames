import GameMap from "./GameMap";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import CharacterParams from "../dist/CharacterParams.json";

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

const Main = (): void => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.setAttribute("width", "450");
  canvas.setAttribute("height", "450");
  canvas.style.marginLeft = "auto";
  canvas.style.marginRight = "auto";
  canvas.style.textAlign = "left";
  canvas.style.width = "600px";
  document.body.append(canvas);
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  const map: GameMap = new GameMap(0, 0, 30, 30, "#84C98B");
  const p = CharacterParams.grass;
  const player: Player = new Player(p.name, p.radius, p.speed, p.imgPath, map);
  let enemies: Enemy[] = createEnemy(map, player);
  let endFlag = false;

  canvas.tabIndex = 1;
  canvas.onkeydown = (event): void => {
    event.preventDefault();
    switch (event.key) {
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
          endFlag = false;
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
    ctx.stroke();
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

Main();

const message = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  message: string,
  color: string
): void => {
  ctx.font = "48px serif";
  ctx.fillStyle = color;
  ctx.fillText(message, canvas.width / 4.5, canvas.height / 2.8);
  ctx.font = "36px serif";
  ctx.fillText("Press any key.", canvas.width / 4, canvas.height / 2);
};
