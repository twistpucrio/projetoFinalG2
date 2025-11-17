const container = document.getElementById("grid");
const player = document.getElementById("player");

const step = 80;    // Tamanho do movimento (célula da grid)

// PONTO ZERO DA GRID (Canto superior esquerdo do #grid)
const offsetX = 0; 
const offsetY = 0; 

// #grid tem 1580px de largura e 560px de altura
const numCols = 19; // 1580 / 80 = 19.75 -> 19 Colunas
const numRows = 7;  // 560 / 80 = 7 Linhas


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
const startColIndex = 0; // Coluna 1
const startRowIndex = Math.floor(numRows / 2); // 3 (Linha central)

let playerX = startColIndex * step; // 0 * 80 = 0px
let playerY = startRowIndex * step; // 3 * 80 = 240px

player.style.top = playerY + "px";
player.style.left = playerX + "px";

// --- Função Auxiliar para Conversão de Coordenadas de Pixel para Grid (0-indexada) ---
const getGridCoord = (pixelCoord) => Math.round(pixelCoord / step);

const obstaculos = [
    // --- Carro Roxo (Começa na Coluna 10, Índice 9 | Linhas 2, 3, 4)
    
    // Linha 3 (Índice 2)
    {x: 9, y: 2}, {x: 10, y: 2}, 
    
    // --- Carro Rosa (Ajuste Fino, usando índices que funcionam visualmente)
    // Se o Carro Rosa começa visualmente na Coluna 4 (índice 3),
    {x: 4, y: 5}, {x: 5, y: 5},

    // --- Gato (Ajuste Fino: Coluna 14, Linha 4)
    {x: 14, y: 4},

    // Muito longe do destino 
     {x: 18, y: 0}, //linha 0

     //Muito longe do destino 
      {x: 18, y: 6}, //linha 5

];

// Posição final da casa (destino): left: 1450px, top: -43px
const destino = [
   
    {x: 18, y: 1}, //linha 1
    {x: 18, y: 2}, //linha 1
    {x: 18, y: 3}, //linha 2
    {x: 18, y: 4}, //linha 3
    {x: 18, y: 5}, //linha 4
    {x: -1, y: -1}  //posição inválida para evitar erros
   
];

// --- FUNÇÕES MODAL ---

function abrirGameOver(){
    // 1. Obtém o elemento da imagem dentro do modal
    const modalImage = document.getElementById("gameOverModalImage");
    
    // 2. Define a imagem que deve aparecer
    // O ID "gameOverModalImage" deve estar no seu HTML, como sugerido anteriormente.
    modalImage.src = "img/entregadoraCaida.png";
    
    // 3. Exibe o modal
    document.getElementById("gameOverModal").style.display = "flex";
    }

    function abrirVitoria(){
        document.getElementById("vitoriaModal").style.display = "flex";
    }

// Função para fechar o modal, limpar a imagem e reiniciar o jogador (sem recarregar)
function fecharGameOverEReiniciar() {
    // 1. Limpa a fonte da imagem do modal (opcional, mas boa prática)
    document.getElementById("gameOverModalImage").src = "";

    // 2. Fecha o modal
    document.getElementById("gameOverModal").style.display = "none";

    // 3. Reinicia a posição do jogador
    playerX = startColIndex * step; // 0px
    playerY = startRowIndex * step; // 240px
    player.style.top = playerY + "px";
    player.style.left = playerX + "px";

    // Se quiser recarregar, use location.reload();
}

// --- LÓGICA DE MOVIMENTO PRINCIPAL (BLOCO ÚNICO) ---

document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault(); 
    }
    
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

        // Chama a função que configura a imagem no modal e o abre.
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
}); // ⬅️ Fechamento correto do evento

// --- Função auxiliar de atraso ---
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
