"use strict";
class Enemy extends Character {
    imagePath;
    targets;
    constructor(name, radius, speed, imagePath, targets, map, x, y) {
        super(name, radius, speed, map, x, y);
        this.imagePath = imagePath;
        this.targets = targets;
    }
    decideDirection() {
        this.targets.forEach((t) => {
            if (!t.isAlive())
                return;
            if (Math.random() < 0.5) {
                t.getCx() - this.getCx() < 0
                    ? (this.nextDirection.x = -1)
                    : (this.nextDirection.x = 1);
                this.nextDirection.y = 0;
            }
            else {
                this.nextDirection.x = 0;
                t.getCy() - this.getCy() < 0
                    ? (this.nextDirection.y = -1)
                    : (this.nextDirection.y = 1);
            }
        });
    }
    move1(duration) {
        this.decideDirection();
        this.move(duration);
    }
    draw(ctx) {
        const img = new Image();
        img.src = this.imagePath;
        ctx.drawImage(img, this.getCx(), this.getCy());
    }
    killTarget() {
        this.targets.forEach((t) => {
            if (!t.isAlive())
                return;
            if (this.getDistance(t) <= Math.max(this.radius, t.radius)) {
                t.die();
            }
        });
    }
}
