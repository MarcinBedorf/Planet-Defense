import Enemy from "./Enemy.js";

export default class Rhinomorph extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById('rhinomorph');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 6;
        this.lives = 4;
        this.maxLives = this.lives;
    }
}