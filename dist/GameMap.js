"use strict";
class GameMap {
    x;
    y;
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
    constructor(x, y, width, height, wallFillStyle) {
        this.x = x;
        this.y = y;
        this.tileSize = { width, height };
        this.wallFillStyle = wallFillStyle;
    }
    getTileWidth() {
        return this.tileSize.width;
    }
    getTileHeight() {
        return this.tileSize.height;
    }
    getTile(width, height) {
        const x = Math.floor((width - this.x) / this.getTileWidth());
        const y = Math.floor((height - this.y) / this.getTileHeight());
        return { x, y, kind: this.map[y][x] };
    }
    getTileLeftTop(y, x) {
        return {
            left: this.x + x * this.getTileWidth(),
            top: this.y + y * this.getTileHeight(),
        };
    }
    getTileCenter(x, y) {
        const tile = this.getTile(x, y);
        const leftTop = this.getTileLeftTop(tile.y, tile.x);
        return {
            x: Math.floor(leftTop.left + this.getTileWidth() / 2),
            y: Math.floor(leftTop.top + this.getTileHeight() / 2),
        };
    }
    canMoveLeft(x, y) {
        const tile = this.getTile(x, y);
        return tile.x === 0 || this.map[tile.y][tile.x - 1] === 0;
    }
    canMoveUp(x, y) {
        const tile = this.getTile(x, y);
        return tile.y === 0 || this.map[tile.y - 1][tile.x] === 0;
    }
    canMoveRight(x, y) {
        const tile = this.getTile(x, y);
        return (tile.x + 1 === this.map[0].length || this.map[tile.y][tile.x + 1] === 0);
    }
    canMoveDown(x, y) {
        const tile = this.getTile(x, y);
        return tile.y + 1 === this.map.length || this.map[tile.y + 1][tile.x] === 0;
    }
    drawWall(ctx, y, x) {
        ctx.fillStyle = this.wallFillStyle;
        ctx.rect(this.x + x * this.getTileWidth(), this.y + y * this.getTileHeight(), this.getTileWidth(), this.getTileHeight());
        ctx.fill();
    }
    draw(ctx) {
        ctx.beginPath();
        this.map.forEach((y, i) => {
            y.forEach((x, j) => {
                if (!x) {
                    this.drawWall(ctx, i, j);
                }
            });
        });
    }
}
