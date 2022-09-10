"use strict";
class Enemy extends Character {
    radius;
    color;
    target;
    constructor(radius, speed, color, target, map, row, col) {
        super(radius, speed, map, row, col);
        this.radius = radius;
        this.color = color;
        this.target = target;
    }
    decideDirection() {
        if (Math.random() < 0.5) {
            if (this.target.getCx() - this.getCx() < 0) {
                this.nextMovingDirection.x = -1;
            }
            else {
                this.nextMovingDirection.x = 1;
            }
            this.nextMovingDirection.y = 0;
        }
        else {
            this.nextMovingDirection.x = 0;
            if (this.target.getCy() - this.getCy() < 0) {
                this.nextMovingDirection.y = -1;
            }
            else {
                this.nextMovingDirection.y = 1;
            }
        }
    }
    move1(duration) {
        this.decideDirection();
        this.move(duration);
    }
    draw(ctx) {
        const img = new Image();
        img.src = "./dist/resources/zebra.png";
        ctx.drawImage(img, this.getCx(), this.getCy());
    }
    killTarget() {
        if (this.getDistance(this.target) <= Math.max(this.radius, this.target.radius)) {
            this.target.die();
        }
    }
}
