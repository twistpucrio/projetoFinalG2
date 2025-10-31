const container = document.getElementById("container");
const player = document.getElementById("player");

let playerX = 180; // posição inicial no eixo X
let playerY = 100; // posição inicial no eixo Y

player.style.top = playerY + "px";
player.style.left = playerX + "px";

const step = 40;   // tamanho do movimento
const limitMin = 0;
const limitMax = 400;

document.addEventListener("keydown", (e) => {

    switch (e.key) {
        
        case "ArrowLeft":
            if (playerX > limitMin) playerX -= step;
            break;

        case "ArrowRight":
            if (playerX < limitMax) playerX += step;
            break;

        case "ArrowUp":
            if (playerY > limitMin) playerY -= step;
            break;

        case "ArrowDown":
            if (playerY < limitMax) playerY += step;
            break;
    }

    player.style.top = playerY + "px";
    player.style.left = playerX + "px";

    console.log(playerX, playerY);
});

