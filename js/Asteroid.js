import Enemy from "./Enemy.js";

export default class Asteroid extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById('asteroid');
        this.frameX = 0
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 7;
        this.lives = 1;
        this.maxLives = this.lives;
    }
}