"use strict";
let can;
let con;
// 迷路を表示する場所
const offsetX = 40;
const offsetY = 60;
const magnification = 18.0;
Main();
function Main() {
    can = document.getElementById('can') ?? undefined;
    console.log(can);
    con = can.getContext("2d") ?? undefined;
    can.width = offsetX * 2 + magnification * 25; // 餌は横は25、縦は28配置されている
    can.height = offsetY * 2 + magnification * 28;
    can.style.border = "1px solid #111";
    setInterval(Draw, 10); // 0.01秒ごとに再描画をする
}
function Draw() {
    DrawMazes(); // 他にも描画するものがあるが、いまは通路だけ表示する
}
function DrawMazes() {
    if (con) {
        con.fillStyle = "black";
        con.fillRect(0, 0, can.width, can.height);
    }
    DrawWalls();
    DrawAisles();
}
function DrawAisles() {
    DrawAisle(0, 0, 11, 0);
    DrawAisle(0, 4, 25, 4);
    DrawAisle(0, 7, 5, 7);
    DrawAisle(11, 0, 11, 4);
    DrawAisle(0, 0, 0, 7);
    DrawAisle(5, 0, 5, 25);
    DrawAisle(0, 7, 5, 7);
    DrawAisle(0, 13, 8, 13);
    DrawAisle(14, 0, 25, 0);
    DrawAisle(14, 4, 25, 4);
    DrawAisle(20, 7, 25, 7);
    DrawAisle(25, 0, 25, 7);
    DrawAisle(20, 0, 20, 25);
    DrawAisle(14, 0, 14, 4);
    DrawAisle(8, 4, 8, 7);
    DrawAisle(17, 4, 17, 7);
    DrawAisle(8, 7, 11, 7);
    DrawAisle(14, 7, 17, 7);
    DrawAisle(8, 7, 11, 7);
    DrawAisle(14, 7, 17, 7);
    DrawAisle(11, 7, 11, 10);
    DrawAisle(14, 7, 14, 10);
    DrawAisle(8, 10, 17, 10);
    DrawAisle(8, 16, 17, 16);
    DrawAisle(8, 10, 8, 19);
    DrawAisle(17, 10, 17, 19);
    DrawAisle(17, 13, 25, 13);
    DrawAisle(0, 19, 11, 19);
    DrawAisle(14, 19, 25, 19);
    DrawAisle(0, 19, 0, 22);
    DrawAisle(11, 19, 11, 22);
    DrawAisle(14, 19, 14, 22);
    DrawAisle(25, 19, 25, 22);
    DrawAisle(5, 22, 20, 22);
    DrawAisle(0, 22, 2, 22);
    DrawAisle(23, 22, 25, 22);
    DrawAisle(2, 22, 2, 25);
    DrawAisle(8, 22, 8, 25);
    DrawAisle(17, 22, 17, 25);
    DrawAisle(23, 22, 23, 25);
    DrawAisle(0, 25, 5, 25);
    DrawAisle(8, 25, 11, 25);
    DrawAisle(14, 25, 17, 25);
    DrawAisle(20, 25, 25, 25);
    DrawAisle(0, 25, 0, 28);
    DrawAisle(11, 25, 11, 28);
    DrawAisle(14, 25, 14, 28);
    DrawAisle(25, 25, 25, 28);
    DrawAisle(0, 28, 25, 28);
}
function DrawAisle(x1, y1, x2, y2) {
    if (con) {
        con.strokeStyle = "black";
        con.lineWidth = 30;
        // 横に直線を引くときは幅を長めに、縦に描画するときは高さを長めにする
        if (y1 == y2) {
            x1 -= 0.8;
            x2 += 0.8;
        }
        if (x1 == x2) {
            y1 -= 0.8;
            y2 += 0.8;
        }
        con.beginPath();
        con.moveTo(x1 * magnification + offsetX, y1 * magnification + offsetY);
        con.lineTo(x2 * magnification + offsetX, y2 * magnification + offsetY);
        con.stroke();
    }
}
function DrawWalls() {
    DrawWall(0, 0, 11, 0);
    DrawWall(0, 4, 25, 4);
    DrawWall(0, 7, 5, 7);
    DrawWall(11, 0, 11, 4);
    DrawWall(0, 0, 0, 7);
    DrawWall(5, 0, 5, 25);
    DrawWall(0, 7, 5, 7);
    DrawWall(0, 13, 8, 13);
    DrawWall(14, 0, 25, 0);
    DrawWall(20, 7, 25, 7);
    DrawWall(25, 0, 25, 7);
    DrawWall(20, 0, 20, 25);
    DrawWall(14, 0, 14, 4);
    DrawWall(8, 4, 8, 7);
    DrawWall(17, 4, 17, 7);
    DrawWall(8, 7, 11, 7);
    DrawWall(14, 7, 17, 7);
    DrawWall(8, 7, 11, 7);
    DrawWall(14, 7, 17, 7);
    DrawWall(11, 7, 11, 10);
    DrawWall(14, 7, 14, 10);
    DrawWall(8, 10, 17, 10);
    DrawWall(8, 16, 17, 16);
    DrawWall(8, 10, 8, 19);
    DrawWall(17, 10, 17, 19);
    DrawWall(17, 13, 25, 13);
    DrawWall(0, 19, 11, 19);
    DrawWall(14, 19, 25, 19);
    DrawWall(0, 19, 0, 22);
    DrawWall(11, 19, 11, 22);
    DrawWall(14, 19, 14, 22);
    DrawWall(25, 19, 25, 22);
    DrawWall(5, 22, 20, 22);
    DrawWall(0, 22, 2, 22);
    DrawWall(23, 22, 25, 22);
    DrawWall(2, 22, 2, 25);
    DrawWall(8, 22, 8, 25);
    DrawWall(17, 22, 17, 25);
    DrawWall(23, 22, 23, 25);
    DrawWall(0, 25, 5, 25);
    DrawWall(8, 25, 11, 25);
    DrawWall(14, 25, 17, 25);
    DrawWall(20, 25, 25, 25);
    DrawWall(0, 25, 0, 28);
    DrawWall(11, 25, 11, 28);
    DrawWall(14, 25, 14, 28);
    DrawWall(25, 25, 25, 28);
    DrawWall(0, 28, 25, 28);
}
function DrawWall(x1, y1, x2, y2) {
    if (con) {
        con.strokeStyle = "blue";
        con.lineWidth = 35;
        // 横に直線を引くときは幅を長めに、縦に描画するときは高さを長めにする
        if (y1 == y2) {
            x1 -= 0.8;
            x2 += 0.8;
        }
        if (x1 == x2) {
            y1 -= 0.8;
            y2 += 0.8;
        }
        con.beginPath();
        con.moveTo(x1 * magnification + offsetX, y1 * magnification + offsetY);
        con.lineTo(x2 * magnification + offsetX, y2 * magnification + offsetY);
        con.stroke();
    }
}
