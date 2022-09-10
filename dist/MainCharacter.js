"use strict";
class MainCharacter extends Character {
    radius;
    theta;
    dTheta;
    constructor(radius, speed, theta, map, row, col) {
        super(radius, speed, map, row, col);
        this.radius = radius;
        this.theta = theta;
        this.dTheta = 3;
    }
    getTheta() {
        return this.theta;
    }
    chew() {
        console.log("theta", this.theta);
        if (this.theta >= 30 || this.theta <= 0) {
            this.dTheta *= -1;
        }
        this.theta += this.dTheta;
        return this.theta;
    }
    move1(duration) {
        console.log("hoge");
        this.chew();
        this.move(duration);
    }
    draw(ctx) {
        const img = new Image();
        img.src = "./dist/resources/plant.png";
        ctx.drawImage(img, this.getCx(), this.getCy());
    }
}
