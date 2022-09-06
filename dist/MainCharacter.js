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
        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.getCx(), this.getCy(), this.radius, (this.getTheta() * Math.PI) / 180, ((360 - this.getTheta()) * Math.PI) / 180);
        ctx.lineTo(this.getCx(), this.getCy());
        ctx.lineTo(this.getCx() + this.radius * Math.cos((this.getTheta() * Math.PI) / 180), this.position.y +
            this.radius * Math.sin((this.getTheta() * Math.PI) / 180));
        ctx.fill();
    }
}
