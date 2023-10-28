import Planet from "./Planet.js";
import Player from "./Player.js";
import Projectile from "./Projectile.js";
import Asteroid from "./Asteroid.js";
import Lobstermorph from "./Lobstermorph.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.planet = new Planet(this);
        this.player = new Player(this);
        this.debug = false;

        this.projectilePool = [];
        this.numberOfProjectiles = 10;
        this.createProjectilePool();

        this.enemyPool = [];
        this.numberOfEnemies = 20;
        this.createEnemyPool();
        this.enemyPool[0].start();
        this.enemyTimer = 0;
        this.enemyInterval = 800;

        this.spriteUpdate = false;
        this.spriteTime = 0;
        this.spriteInterval = 120;
        this.score = 0;
        this.winScore = 100;
        this.playerLives = 5;

        this.mouse = {
            x: 0,
            y: 0
        }
        this.attachListeners();
    }

    attachListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });

        window.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.player.shoot();
        })

        window.addEventListener('keyup', e => {
            if (e.key === 'd') {
                this.debug = !this.debug;
                if (this.debug) {
                    console.log('Debug mode on');
                } else {
                    console.log('Debug mode off');
                }
            } else if (e.key === ' ') {
                this.player.shoot();
            }
        })
    }

    render(context, deltaTime) {
        this.planet.draw(context);
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectilePool.forEach(projectile => {
            projectile.draw(context);
            projectile.update();
        })
        this.enemyPool.forEach(enemy => {
            enemy.draw(context);
            enemy.update();
        });

        if (!this.gameOver) {
            if (this.enemyTimer < this.enemyInterval) {
                this.enemyTimer += deltaTime;
            } else {
                this.enemyTimer = 0;
                const enemy = this.getEnemy();
                if (enemy) {
                    enemy.start();
                }
            }
        }

        if (this.spriteTimer < this.spriteInterval) {
            this.spriteTimer += deltaTime;
            this.spriteUpdate = false;
        } else {
            this.spriteTimer = 0;
            this.spriteUpdate = true;
        }

        if (this.score >= this.winScore || this.playerLives < 1) {
            this.gameOver = true;
        }
    }

    drawStatusText(context) {
        context.save();
        context.textAlign = 'left';
        context.font = '30px "Orbitron", sans-serif';
        context.fillText(`SCORE: ${this.score}`, 20, 30);
        const heart = document.getElementById('heart');
        for (let i = 0; i < this.playerLives; i++) {
            const x = 20 + i * (heart.width + 10);
            context.drawImage(heart, x, 50);
        }
        if (this.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.score >= this.winScore) {
                message1 = 'You win!';
                message2 = `Your score is ${this.score}`;
            } else {
                message1 = 'You lose!';
                message2 = 'Try again';
            }
            context.font = '80px "Orbitron", sans-serif';
            context.fillText(message1, this.width * 0.5, 150);
            context.font = '50px "Orbitron", sans-serif';
            context.fillText(message2, this.width * 0.5, 225);

            const restartGameBtn = document.getElementById('restartGame');
            restartGameBtn.addEventListener('click', () => {
                this.restartGame();
                restartGameBtn.style.display = 'none';
            })
            if (this.gameOver) {
                restartGameBtn.style.display = 'block';
            } else {
                restartGameBtn.style.display = 'none';
            }
        }
        context.restore();
    }

    calculateAim(objectA, objectB) {
        const distanceX = objectA.x - objectB.x;
        const distanceY = objectA.y - objectB.y;
        const hypotenuse = Math.hypot(distanceX, distanceY);
        const aimX = distanceX / hypotenuse * -1;
        const aimY = distanceY / hypotenuse * -1;
        return [aimX, aimY, distanceX, distanceY];
    }

    checkCollision(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const sumOfRadii = a.radius + b.radius;
        return distance < sumOfRadii;
    }

    createProjectilePool() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilePool.push(new Projectile(this));
        }
    }

    getProjectile() {
        for (let i = 0; i < this.projectilePool.length; i++) {
            if (this.projectilePool[i].free) {
                return this.projectilePool[i];
            }
        }
    }

    createEnemyPool() {
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let randomNumber = Math.random();
            if (randomNumber > 0.25) {
                this.enemyPool.push(new Asteroid(this));
            } else {
                this.enemyPool.push(new Lobstermorph(this));
            }
        }
    }

    getEnemy() {
        for (let i = 0; i < this.enemyPool.length; i++) {
            if (this.enemyPool[i].free) {
                return this.enemyPool[i];
            }
        }
    }

    restartGame() {
        this.score = 0;
        this.playerLives = 5;
        this.gameOver = false;
        this.enemyTimer = 0;

        this.projectilePool = [];
        this.numberOfProjectiles = 10;
        this.createProjectilePool();

        this.enemyPool = [];
        this.numberOfEnemies = 20;
        this.createEnemyPool();
        this.enemyPool[0].start();
        this.enemyTimer = 0;
        this.enemyInterval = 800;

    }
}