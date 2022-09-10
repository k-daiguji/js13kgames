"use strict";
class MainCharacter extends Character {
    imagePath;
    targets;
    constructor(radius, speed, imagePath, map, row, col) {
        super(radius, speed, map, row, col);
        this.imagePath = imagePath;
    }
    draw(ctx) {
        const img = new Image();
        img.src = this.imagePath;
        ctx.drawImage(img, this.getCx(), this.getCy());
    }
    setTarget(target) {
        this.targets = target;
    }
    killTarget() {
        if (this.targets) {
            this.targets.forEach((t) => {
                if (this.getDistance(t) <= Math.max(this.radius, t.radius)) {
                    t.die();
                }
            });
        }
    }
}
