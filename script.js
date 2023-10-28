import Game from "./js/Game.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.font = '40px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let gameStarted = false;

    const hints = document.querySelector('.hint-container');
    const startBtn = document.querySelector('.start__game');
    startBtn.addEventListener('click', () => {
        hints.classList.add('hidden');
        gameStarted = true;

        if (gameStarted) {
            const game = new Game(canvas);
            let lastTime = 0;

            function animate(timeStamp) {
                const deltaTime = timeStamp - lastTime;
                lastTime = timeStamp;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                game.render(ctx, deltaTime);
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
        }
    });
})