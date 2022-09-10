"use strict";
class MainCharacter extends Character {
    imagePath;
    targets;
    constructor(name, radius, speed, imagePath, map, x, y) {
        super(name, radius, speed, map, x, y);
        this.imagePath = imagePath;
    }
    draw(ctx) {
        const img = new Image();
        img.src = this.imagePath;
        ctx.drawImage(img, this.getCx(), this.getCy());
    }
    goMove(direction) {
        switch (direction) {
            case 1:
                this.nextDirection = { x: 0, y: -1 };
                break;
            case 2:
                this.nextDirection = { x: 0, y: 1 };
                break;
            case 3:
                this.nextDirection = { x: -1, y: 0 };
                break;
            case 4:
                this.nextDirection = { x: 1, y: 0 };
                break;
        }
    }
    setTarget(targets) {
        this.targets = targets;
    }
    killTarget() {
        if (!this.targets)
            return;
        this.targets.forEach((t) => {
            if (this.getDistance(t) <= Math.max(this.radius, t.radius)) {
                t.die();
            }
        });
    }
}
