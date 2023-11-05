import Enemy from "./Enemy.js";

export default class Beetlemorph extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById('beetlemorph');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 3;
        this.lives = 1;
        this.maxLives = this.lives;
    }
}