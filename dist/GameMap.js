"use strict";
/**
 * マップのコンストラクタ
 * 0: 壁
 * 1: 通路
 */
class GameMap {
    startX;
    startY;
    tileSize;
    wallFillStyle;
    map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    constructor(startX, startY, tileWidth, tileHeight, wallFillStyle) {
        this.startX = startX;
        this.startY = startY;
        this.tileSize = { width: tileWidth, height: tileHeight };
        this.wallFillStyle = wallFillStyle;
    }
    getTileWidth() {
        return this.tileSize.width;
    }
    getTileHeight() {
        return this.tileSize.height;
    }
    // ピクセルで表される座標の点(x, y)が含まれるタイルを返す
    getTile(x, y) {
        const col = Math.floor((x - this.startX) / this.getTileWidth());
        const row = Math.floor((y - this.startY) / this.getTileHeight());
        return { row: row, col: col, kind: this.map[row][col] };
    }
    // row行col列目のタイルのピクセルで表される座標の左上の点(x, y)を返す
    getTileLeftTop(row, col) {
        return {
            left: this.startX + col * this.getTileWidth(),
            top: this.startY + row * this.getTileHeight(),
        };
    }
    // ピクセル座標 (x, y) が属しているタイルの中心座標を返す
    getTileCenter(x, y) {
        const tile = this.getTile(x, y);
        const leftTop = this.getTileLeftTop(tile.row, tile.col);
        return {
            x: Math.floor(leftTop.left + this.getTileWidth() / 2),
            y: Math.floor(leftTop.top + this.getTileHeight() / 2),
        };
    }
    // ピクセルで表される座標の点(x, y)が属するタイルの左のタイルが壁であれば true を返す。
    isLeftBlockWall(x, y) {
        const tile = this.getTile(x, y);
        return tile.col === 0 || this.map[tile.row][tile.col - 1] === 0;
    }
    // ピクセルで表される座標の点(x, y)が属するタイルの上のタイルが壁であれば true を返す。
    isAboveBlockWall(x, y) {
        const tile = this.getTile(x, y);
        return tile.row === 0 || this.map[tile.row - 1][tile.col] === 0;
    }
    // ピクセルで表される座標の点(x, y)が属するタイルの右のタイルが壁であれば true を返す。
    isRightBlockWall(x, y) {
        const tile = this.getTile(x, y);
        return (tile.col + 1 === this.map[0].length ||
            this.map[tile.row][tile.col + 1] === 0);
    }
    // ピクセルで表される座標の点(x, y)が属するタイルの下のタイルが壁であれば true を返す。
    isBelowBlockWall(x, y) {
        const tile = this.getTile(x, y);
        return (tile.row + 1 === this.map.length || this.map[tile.row + 1][tile.col] === 0);
    }
    // 壁の描画
    drawWall(ctx, row, col) {
        ctx.fillStyle = this.wallFillStyle;
        ctx.rect(this.startX + col * this.getTileWidth(), this.startY + row * this.getTileHeight(), this.getTileWidth(), this.getTileHeight());
        ctx.fill();
    }
    draw(ctx) {
        ctx.beginPath();
        this.map.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === 0) {
                    this.drawWall(ctx, i, j);
                }
            });
        });
    }
}
