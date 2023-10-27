export default class Projectile {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.radius = 5;
        this.speedX = 1;
        this.speedY = 1;
        this.speedModifier = 5;
        this.free = true;
    }

    start(x, y, speedX, speedY) {
        this.free = false;
        this.x = x;
        this.y = y;
        this.speedX = speedX * this.speedModifier;
        this.speedY = speedY * this.speedModifier;
    }

    reset() {
        this.free = true;
    }

    draw(context) {
        if (!this.free) {
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = 'gold';
            context.fill();
            context.restore();
        }
    }

    update() {
        if (!this.free) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        if (this.x < 0 || this.x > this.game.width || this.y < 0 || this.y > this.game.height) {
            this.reset();
        }
    }
}