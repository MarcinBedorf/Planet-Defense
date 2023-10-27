export default class Enemy {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.radius = 40;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.speedX = 0;
        this.speedY = 0;
        this.speedModifier = Math.random() * 0.7 + 0.1;
        this.angle = 0;
        this.free = true;
    }

    start() {
        this.free = false;
        this.frameX = 0;
        this.lives = this.maxLives;
        this.frameY = Math.floor(Math.random() * 4);
        if (Math.random() < 0.5) {
            this.x = Math.random() * this.game.width;
            this.y = Math.random() < 0.5 ? -this.radius : this.game.height + this.radius;
        } else {
            this.x = Math.random() < 0.5 ? -this.radius : this.game.width + this.radius;
            this.y = Math.random() * this.game.height;
        }
        const aim = this.game.calculateAim(this, this.game.planet);
        this.speedX = aim[0] *  this.speedModifier;
        this.speedY = aim[1] *  this.speedModifier;
        this.angle = Math.atan2(aim[3], aim[2]) + Math.PI * 0.5;
    }

    reset() {
        this.free = true;
    }

    hit(damage) {
        this.lives -= damage;
        if (this.lives >= 1) {
            this.frameX++;
        }
    }

    draw(context) {
        if (!this.free) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, -this.radius, -this.radius, this.width, this.height);
            if (this.game.debug) {
                context.beginPath();
                context.arc(0, 0, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.fillText(this.lives, 0, 0);
            }
            context.restore();
        }
    }

    update() {
        if (!this.free) {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.game.checkCollision(this, this.game.planet) && this.lives >= 1) {
                this.lives = 0;
                this.speedX = 0;
                this.speedY = 0;
                if (!this.game.gameOver) {
                    this.game.playerLives--;
                }
            }

            if (this.game.checkCollision(this, this.game.player) && this.lives >= 1) {
                this.lives = 0;
                if (!this.game.gameOver) {
                    this.game.playerLives--;
                }
            }

            this.game.projectilePool.forEach(projectile => {
                if (!projectile.free && this.game.checkCollision(this, projectile) && this.lives >= 1) {
                    projectile.reset();
                    this.hit(1);

                    if (this.lives < 1 && !this.game.gameOver) {
                        this.game.score += this.maxLives;
                    }
                }
            })
            if (this.lives < 1 && this.game.spriteUpdate) {
                this.speedX = 0;
                this.speedY = 0;
                this.frameX++;
            }
            if (this.frameX > this.maxFrame) {
                this.reset();
            }
        }
    }
}