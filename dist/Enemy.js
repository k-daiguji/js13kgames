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
        const cx = this.getCx();
        const cy = this.getCy();
        const radius = this.radius;
        const bodyHeight = radius;
        const legHeight = (radius / 5) * 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(cx - radius, cy);
        ctx.arc(cx, cy, radius, Math.PI, 2 * Math.PI);
        ctx.lineTo(cx + radius, cy + bodyHeight);
        ctx.lineTo(cx + (radius / 3) * 2, cy + bodyHeight - legHeight);
        ctx.lineTo(cx + radius / 3, cy + bodyHeight);
        ctx.lineTo(cx, cy + bodyHeight - legHeight);
        ctx.lineTo(cx - radius / 3, cy + bodyHeight);
        ctx.lineTo(cx - (radius / 3) * 2, cy + bodyHeight - legHeight);
        ctx.lineTo(cx - radius, cy + bodyHeight);
        ctx.lineTo(cx - radius, cy);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        const leftEyeX = cx - (20 * radius) / 50;
        const leftEyeY = cy - (4 * radius) / 50;
        const rightEyeX = cx + (20 * radius) / 50;
        const rightEyeY = cy - (4 * radius) / 50;
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, (16 * radius) / 50, 0, Math.PI * 2);
        ctx.arc(rightEyeX, rightEyeY, (16 * radius) / 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0000FF";
        ctx.beginPath();
        ctx.arc(leftEyeX - (8 * radius) / 50, leftEyeY - (4 * radius) / 50, (7 * radius) / 50, 0, Math.PI * 2);
        ctx.arc(rightEyeX - (8 * radius) / 50, rightEyeY - (4 * radius) / 50, (7 * radius) / 50, 0, Math.PI * 2);
        ctx.fill();
    }
    killTarget() {
        if (this.getDistance(this.target) <= Math.max(this.radius, this.target.radius)) {
            this.target.die();
        }
    }
}
