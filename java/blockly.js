//setando a direcao original da personagem
let direcaoAtual = 'direita';

const personagem = document.getElementById("player");

const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // -----Blocos de comando ------------
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },/*
    {
      kind: 'block',
      type: 'controls_whileUntil'
    },
    {
      kind: 'block',
      type: 'hello_world'
    },
    {
      kind: 'block',
      type: 'math_number'
    },*/
    {
      kind: 'block',
      type: 'controls_repeat'
    },
    {
      kind: 'block',
      type: 'blocked_path'
    },
    {
      kind: 'block',
      type: 'cleared_path'
    },
    {
      kind: 'block',
      type: 'go_forward'
    },
    {
      kind: 'block',
      type: 'turn_left'
    },
    {
      kind: 'block',
      type: 'turn_right'
    }
    // Modificar aqui para mais blocos
  ]
};

//--------definindo blocos novos-----------
Blockly.common.defineBlocksWithJsonArray([{
  "type": "cleared_path",
  "message0": 'caminho livre',
  "colour": 315,
  "output": "Boolean",
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "blocked_path",
  "message0": 'caminho bloqueado',
  "colour": 315,
  "output": "Boolean",
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "go_forward",
  "message0": 'siga em frente',
  "colour": 255,
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "turn_left",
  "message0": 'vira para a esquerda',
  "colour": 180,
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "turn_right",
  "message0": 'vira para a direita',
  "colour": 180,
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);


//------logica por tras dos blocos----------------------
Blockly.JavaScript.forBlock["blocked_path"] = () => {
  const code = `
    (()=>{
      let checkX = playerX;
      let checkY = playerY;

      if (direcaoAtual === 'direita') checkX += step;
      else if (direcaoAtual === 'esquerda') checkX -= step;
      else if (direcaoAtual === 'cima') checkY -= step;
      else if (direcaoAtual === 'baixo') checkY += step;

      let gridCheck = {
        x: Math.round(checkX / step),
        y: Math.round(checkY / step)
      };

      return obstaculos.some(o => o.x === gridCheck.x && o.y === gridCheck.y);
    })()
  `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript.forBlock["cleared_path"] = () => {
  const code = `
    (()=>{
      let checkX = playerX;
      let checkY = playerY;

      if (direcaoAtual === 'direita') checkX += step;
      else if (direcaoAtual === 'esquerda') checkX -= step;
      else if (direcaoAtual === 'cima') checkY -= step;
      else if (direcaoAtual === 'baixo') checkY += step;

      let gridCheck = {
        x: Math.round(checkX / step),
        y: Math.round(checkY / step)
      };

      return !obstaculos.some(o => o.x === gridCheck.x && o.y === gridCheck.y);
    })()
  `;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

async function  go_forward(){
  await sleep(400); // espera 400 ms entre movimentos
  nextX = playerX;
  nextY = playerY;

  if (direcaoAtual === 'direita') nextX += step;
  else if (direcaoAtual === 'esquerda') nextX -= step;
  else if (direcaoAtual === 'cima') nextY -= step;
  else if (direcaoAtual === 'baixo') nextY += step;

  var gridprox = {
    x: Math.round(nextX / step),
    y: Math.round(nextY / step)
  };

  if (obstaculos.some(o => o.x === gridprox.x && o.y === gridprox.y)) {
    console.log("perdeu pq atingiu um obstaculo");
    abrirGameOver();
    return false;
  } else if (destino.some(d => d.x === gridprox.x && d.y === gridprox.y)) {

    abrirVitoria();
    return false;
  } 
  else if (nextX < limitMinH || nextX > limitMaxH || nextY < limitMinV || nextY > limitMaxV ){
    console.log("perdeu pq saiu da pista");
    abrirGameOver();
    return false;
  }  
  
  playerX = nextX;
  playerY = nextY;
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
  return true;
}

//segue em frente independente da direcao para qual a personagem está voltada
Blockly.JavaScript.forBlock["go_forward"] = () => {
  return `
    if(!await go_forward()){
      return;
    }
    
  `;
};


// o vira para a esquerda independente da direcao para qual ela está voltada
Blockly.JavaScript.forBlock["turn_left"] = () => {
  return `
    await sleep(400);

    if (direcaoAtual === 'direita') {
      direcaoAtual = 'cima';
      personagem.src = "img/entregadoraDeCostas.png" ;
    }
    else if (direcaoAtual === 'cima'){
      direcaoAtual = 'esquerda';
      personagem.src = "img/entregadoraViradaEsquerda.png";
    } 
    else if (direcaoAtual === 'esquerda'){
      direcaoAtual = 'baixo';
      personagem.src = "img/entregadoraDeFrente.png";
    } 
    else if (direcaoAtual === 'baixo'){
      direcaoAtual = 'direita';
      personagem.src = "img/entregadoraViradaDireita.png";
    } 

  `;
};

// o vira para a direita independente da direcao para qual ela está voltada
Blockly.JavaScript.forBlock["turn_right"] = () => {
  return `
    await sleep(400);

    if (direcaoAtual === 'direita') {
      direcaoAtual = 'baixo';
      personagem.src = "img/entregadoraDeFrente.png" ;
    }
    else if (direcaoAtual === 'cima'){
      direcaoAtual = 'direita';
      personagem.src = "img/entregadoraViradaDireita.png";
    } 
    else if (direcaoAtual === 'esquerda'){
      direcaoAtual = 'cima';
      personagem.src = "img/entregadoraDeCostas.png";
    } 
    else if (direcaoAtual === 'baixo'){
      direcaoAtual = 'esquerda';
      personagem.src = "img/entregadoraViradaEsquerda.png";
    } 
  `;
};

//onde adicionamos a toolbox no espaco da div
const workspace = Blockly.inject(document.getElementById('drag'), {
  toolbox, 
  maxInstances: {
    go_forward: 3
  }
});


// pequeno timeout para garantir que o flyout foi criado
setTimeout(() => {
  const flyout = document.querySelector('.blocklyFlyout');
  if (flyout) {
    flyout.style.overflowY = 'auto';
    flyout.style.overflowX = 'hidden';
    flyout.style.maxHeight = '100%';
    flyout.style.boxSizing = 'border-box';
  }

  // também ajusta a div onde o flyout coloca os blocos
  const flyoutSvg = document.querySelector('.blocklyFlyoutBackground');
  if (flyoutSvg && flyoutSvg.parentElement) {
    flyoutSvg.parentElement.style.overflowY = 'auto';
    flyoutSvg.parentElement.style.maxHeight = '100%';
  }
}, 100);


//botao para rodar 
const btnRodar = document.getElementById("btn_rodar");
btnRodar.addEventListener("click", async () => {
  //reseta direcao logica
  playerX = startColIndex * step;
  playerY = startRowIndex * step;

  //reseta posicao da personagem
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  //reseta a direcao para a qual a personagem está voltada
  direcaoAtual = 'direita';

  //reseta a imagem da personagem
  personagem.src = "img/entregadoraViradaDireita.png"; 

  controle =1; 

  controle = 1;

  // fechar modais visíveis (se houver)
  const modalGameOver = document.getElementById("gameOverModal");
  if (modalGameOver) modalGameOver.style.visibility = "hidden";
  const vModal = document.getElementById("vitoriaModal");
  if (vModal) vModal.style.visibility = "hidden";

  // pequeno delay para evitar que a tela já esteja no destino visualmente
  await sleep(100);
  const script = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(script);

  // Executa o script gerado pelo Blockly dentro de uma IIFE async
  await eval(`(async () => { ${script} })()`);
  verificarFimDoBlockly();

});
