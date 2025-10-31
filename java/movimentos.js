const container = document.getElementById("grid");
const player = document.getElementById("player");

let playerX = 150; // posição inicial no eixo X
let playerY = 310; // posição inicial no eixo Y

player.style.top = playerY + "px";
player.style.left = playerX + "px";

const step = 80;   // tamanho do movimento
const limitMinH = 160;
const limitMaxH = 1560;

const limitMinV = 148;   // topo
const limitMaxV = 550;  // fundo 


document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowLeft":
            if (playerX > limitMinH) playerX -= step;
            break;

        case "ArrowRight":
            if (playerX < limitMaxH) playerX += step;
            break;

        case "ArrowUp":
            if (playerY > limitMinV) playerY -= step;
            break;

        case "ArrowDown":
            if (playerY < limitMaxV) playerY += step;
            break;

    }

    player.style.top = playerY + "px";
    player.style.left = playerX + "px";

    console.log(playerX, playerY);
});

