"use strict";
/**
 * キャラクタの共通クラス
 * @param speed 移動速度
 * @param map マップ
 * @param row マップ上の初期位置
 * @param col マップ上の初期位置
 */
class Character {
    radius;
    speed;
    map;
    position;
    movingDirection;
    nextMovingDirection;
    movingDistance;
    alive;
    constructor(radius, speed, map, row, col) {
        this.radius = radius;
        this.speed = speed;
        this.map = map;
        const leftTop = this.map.getTileLeftTop(row, col);
        // ピクセルベースの移動の描画に必要な情報
        this.position = {
            x: Math.floor(leftTop.left + this.map.getTileWidth() / 2),
            y: Math.floor(leftTop.top + this.map.getTileHeight() / 2),
        };
        this.movingDirection = { x: 0, y: 0 };
        this.nextMovingDirection = { x: 0, y: 0 };
        this.movingDistance = 0;
        this.alive = true;
    }
    getCx() {
        return this.position.x - 12;
    }
    getCy() {
        return this.position.y - 12;
    }
    getSpeed() {
        return this.speed;
    }
    goMove(direction) {
        if (direction === 1) {
            this.nextMovingDirection = { x: 0, y: -1 };
        }
        else if (direction === 2) {
            this.nextMovingDirection = { x: 0, y: 1 };
        }
        else if (direction === 3) {
            this.nextMovingDirection = { x: -1, y: 0 };
        }
        else if (direction === 4) {
            this.nextMovingDirection = { x: 1, y: 0 };
        }
    }
    getTop() {
        return this.position.y - this.radius;
    }
    getBottom() {
        return this.position.y + this.radius;
    }
    getLeft() {
        return this.position.x - this.radius;
    }
    getRight() {
        return this.position.x + this.radius;
    }
    isAlive() {
        return this.alive;
    }
    die() {
        this.alive = false;
    }
    isMovingHorizontally() {
        return this.movingDirection.x !== 0;
    }
    isMovingVertically() {
        return this.movingDirection.y !== 0;
    }
    isStop() {
        return !this.isMovingHorizontally() && !this.isMovingVertically();
    }
    isNextMovingDirectionOk() {
        if (this.nextMovingDirection.x < 0) {
            return !this.map.isLeftBlockWall(this.position.x, this.position.y);
        }
        else if (this.nextMovingDirection.x > 0) {
            return !this.map.isRightBlockWall(this.position.x, this.position.y);
        }
        else if (this.nextMovingDirection.y < 0) {
            return !this.map.isAboveBlockWall(this.position.x, this.position.y);
        }
        else if (this.nextMovingDirection.y > 0) {
            return !this.map.isBelowBlockWall(this.position.x, this.position.y);
        }
        else {
            return true;
        }
    }
    move(duration) {
        let arrived = false;
        const distance = (duration * this.getSpeed()) / 1000;
        if (this.isStop()) {
            arrived = true;
        }
        else if (this.isMovingHorizontally()) {
            this.movingDistance += distance;
            if (this.movingDistance >= this.map.getTileWidth()) {
                this.movingDistance = 0;
                arrived = true;
            }
            else {
                this.position.x += this.movingDirection.x * distance;
            }
        }
        else if (this.isMovingVertically()) {
            this.movingDistance += distance;
            if (this.movingDistance >= this.map.getTileHeight()) {
                this.movingDistance = 0;
                arrived = true;
            }
            else {
                this.position.y += this.movingDirection.y * distance;
            }
        }
        else {
            throw "Unexpected moving.";
        }
        if (arrived) {
            this.position = this.map.getTileCenter(this.position.x, this.position.y);
            if (this.isNextMovingDirectionOk()) {
                this.movingDirection.x = this.nextMovingDirection.x;
                this.movingDirection.y = this.nextMovingDirection.y;
            }
            else {
                this.nextMovingDirection.x = this.movingDirection.x;
                this.nextMovingDirection.y = this.movingDirection.y;
                if (!this.isNextMovingDirectionOk()) {
                    this.movingDirection = { x: 0, y: 0 };
                }
            }
        }
    }
    getDistance(other) {
        return Math.sqrt(Math.pow(this.getCx() - other.getCx(), 2) +
            Math.pow(this.getCy() - other.getCy(), 2));
    }
}
