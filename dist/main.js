"use strict";
// import GameMap from "./GameMap";
// import MainCharacter from "./MainCharacter";
// import Enemy from "./Enemy";
// let canvas: HTMLCanvasElement | undefined;
// let ctx: CanvasRenderingContext2D | undefined;
// Main();
// function Main() {
//   canvas = <HTMLCanvasElement>document.getElementById("pac-man") ?? undefined;
//   if (!canvas) return;
//   ctx = canvas.getContext("2d") ?? undefined;
//   // マップのインスタンスを作成。
//   const map = new GameMap(0, 0, 20, 20, "#0000FF");
//   // パックマンのインスタンスを作成。
//   const pacman = new MainCharacter(10, 80, 30, map, 1, 1);
//   const enemies = [
//     new Enemy(10, 80, "#FF0000", pacman, map, 1, 9),
//     new Enemy(10, 60, "#00FF00", pacman, map, 9, 6),
//     new Enemy(10, 90, "#0000FF", pacman, map, 10, 7),
//   ];
//   // キャンバスをフォーカスできるように設定。
//   canvas.tabIndex = 1;
//   // キャンバスに対して、キーが押された時の処理方法を設定。
//   canvas.onkeydown = function (event) {
//     event.preventDefault(); // ブラウザによって設定されているデフォルトの動作を無効化。
//     // JavaScript では、キーボードのキーそれぞれに整数値が割り当てられており、
//     // 押されたキーの番号が event オブジェクトの keyCode 属性にセットされる。
//     switch (event.keyCode) {
//       case 37: // キーボードの左ボタンが押された。
//         pacman.goMove(3);
//         break;
//       case 38: // キーボードの上ボタンが押された。
//         pacman.goMove(1);
//         break;
//       case 39: // キーボードの右ボタンが押された。
//         pacman.goMove(4);
//         break;
//       case 40: // キーボードの下ボタンが押された。
//         pacman.goMove(2);
//         break;
//     }
//   };
//   // function playLoop(duration: number) {
//   //   ctx.beginPath();
//   //   ctx.fillStyle = "#000000";
//   //   ctx.strokeStyle = "#0000FF";
//   //   ctx.rect(0, 0, canvas.width, canvas.height); // 一つ前のフレームに描画された画面を消去。
//   //   ctx.fill();
//   //   ctx.stroke();
//   //   map.draw(ctx); // マップを描画。
//   //   pacman.move(duration); // パックマンを移動させる。
//   //   pacman.draw(ctx); // パックマンを描画。
//   //   for (let i = 0; i < enemies.length; i++) {
//   //     console.log("akabei", duration, i);
//   //     enemies[i].move(duration);
//   //     enemies[i].killTarget();
//   //     enemies[i].draw(ctx);
//   //   }
//   // }
//   // ゲーム画面を描画して進行させる関数。
//   // window.requestAnimationFrame メソッドから呼び出される。
//   // let previousDrawingTime = 0;
//   // function mainLoop(timestamp: number) {
//   //   if (previousDrawingTime == 0) {
//   //     previousDrawingTime = timestamp;
//   //   }
//   //   const duration = timestamp - previousDrawingTime; // 前回の描画からの経過時間 (ms)
//   //   if (pacman.isAlive()) {
//   //     playLoop(duration);
//   //   }
//   //   previousDrawingTime = timestamp; // 描画した時刻の更新。
//   //   window.requestAnimationFrame(mainLoop); // 次のフレームの描画をブラウザに依頼。
//   // }
//   // // ブラウザに mainLoop 関数を用いてゲーム画面の描画をするように依頼。
//   // // 描画のタイミングはブラウザが決定する。
//   // window.requestAnimationFrame(mainLoop);
// }
