import Enemy from "./Enemy.js";

export default class Lobstermorph extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById('lobstermorph');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 14;
        this.lives = 8;
        this.maxLives = this.lives;
    }
}