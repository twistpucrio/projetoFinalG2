const container = document.getElementById("grid");
const player = document.getElementById("player");

const step = 80;    // Tamanho do movimento (célula da grid)

// PONTO ZERO DA GRID (Canto superior esquerdo do #grid)
const offsetX = 0; 
const offsetY = 0; 

// #grid tem 1580px de largura e 560px de altura
const numCols = 19; // 1580 / 80 = 19.75 -> 19 Colunas
const numRows = 7;  // 560 / 80 = 7 Linhas

// --- LIMITES DA GRID (Agora baseados em 0,0) ---
// Coluna 1: 0px
const limitMinH = offsetX; 
// Coluna 19: (19 - 1) * 80 = 1440px
const limitMaxH = offsetX + (numCols - 1) * step; 

// Linha 1: 0px
const limitMinV = offsetY; 
// Linha 7: (7 - 1) * 80 = 480px
const limitMaxV = offsetY + (numRows - 1) * step; 

// --- POSIÇÕES INICIAIS DO PLAYER (Col 1, Lin 7) ---
// O player começa no canto superior esquerdo da Coluna 1 e Linha 7
const startColIndex = 0; // Coluna 1
const startRowIndex = Math.floor(numRows / 2); // 3 (Linha central)

let playerX = startColIndex * step; // 0 * 80 = 0px
let playerY = startRowIndex * step; // 3 * 80 = 240px

player.style.top = playerY + "px";
player.style.left = playerX + "px";

// --- Função Auxiliar para Conversão de Coordenadas de Pixel para Grid (0-indexada) ---
const getGridCoord = (pixelCoord) => Math.round(pixelCoord / step);


// casas onde NÃO pode entrar (coluna, linha) (0-indexadas)
// Mapeamento baseado nos seus valores de left/top do CSS (Col 10 = 9)
// ATENÇÃO: Se o Game Over está na Coluna 8 (índice 7), 
// ESTA VERSÃO CORRIGE ISSO, PULANDO AS COLUNAS 7 e 8.

const obstaculos = [
    // --- Carro Roxo (Começa na Coluna 10, Índice 9 | Linhas 2, 3, 4)
    
    // Linha 3 (Índice 2)
    {x: 9, y: 2}, {x: 10, y: 2}, 
    
    // --- Carro Rosa (Ajuste Fino, usando índices que funcionam visualmente)
    // Se o Carro Rosa começa visualmente na Coluna 4 (índice 3),
    {x: 4, y: 5}, {x: 5, y: 5},

    // --- Gato (Ajuste Fino: Coluna 14, Linha 4)
    {x: 14, y: 4},
];

// Posição final da casa (destino): left: 1450px, top: -43px
const destino = [
    {x: 18, y: 0}, //linha 0
    {x: 18, y: 1}, //linha 1
    {x: 18, y: 2}, //linha 1
    {x: 18, y: 3}, //linha 2
    {x: 18, y: 4}, //linha 3
    {x: 18, y: 5}, //linha 4
    {x: 18, y: 6}, //linha 5
];

// --- FUNÇÕES MODAL (Permanecem as mesmas) ---

function abrirGameOver(){
    document.getElementById("gameOverModal").style.display = "flex";
}

function abrirVitoria(){
    document.getElementById("vitoriaModal").style.display = "flex";
}


// --- LÓGICA DE MOVIMENTO PRINCIPAL ---

document.addEventListener("keydown", (e) => {
    let nextX=playerX;
    let nextY=playerY;

    switch (e.key) {
        case "ArrowLeft": 
            if(playerX > limitMinH) nextX -= step; 
            break;
        case "ArrowRight": 
            if(playerX < limitMaxH) nextX += step; 
            break;
        case "ArrowUp": 
            if(playerY > limitMinV) nextY -= step; 
            break;
        case "ArrowDown": 
            if(playerY < limitMaxV) nextY += step; 
            break;
    }

    // CÁLCULO DA PRÓXIMA POSIÇÃO DA GRID (0-indexada)
    let gridprox={
      x: getGridCoord(nextX), 
      y: getGridCoord(nextY)
    };

    // 1. Checa colisão com obstáculos
    if (obstaculos.some(o => o.x === gridprox.x && o.y === gridprox.y)) {
        abrirGameOver();
        return; // bloqueia o movimento
    }

    // 2. Checa se chegou no destino
    if (destino.some(d => d.x === gridprox.x && d.y === gridprox.y)) {
        abrirVitoria();
        return;
}

    // 3. Atualiza a posição da boneca (Movimento instantâneo/teletransporte)
    playerX = nextX;
    playerY = nextY;
    player.style.top = playerY + "px";
    player.style.left = playerX + "px";

    console.log(`Posição em Pixels: (${playerX}, ${playerY}) | Posição na Grid (0-index): (${gridprox.x}, ${gridprox.y})`);
});