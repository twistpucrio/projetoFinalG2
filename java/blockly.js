let direcaoAtual = 'direita';
//EM RELACAO AS SETAS DO TECLADO: pode ser cima baixo esquerda ou direita (direcao para qual a personagem está voltada)
const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // Blocos de comando 
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },
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
    },
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
      type: 'go_forward'
    },
    {
      kind: 'block',
      type: 'turn_left'
    }
    // Modificar aqui para mais blocos
  ]
};

//definindo blocos novos
Blockly.common.defineBlocksWithJsonArray([{
  "type": "hello_world",
  "message0": 'hello world',
  "colour": 160,
  "previousStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "blocked_path",
  "message0": 'caminho bloqueado',
  "colour": 300,
  "output": null,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "go_forward",
  "message0": 'siga em frente',
  "colour": 210,
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "turn_left",
  "message0": 'vira para a esquerda',
  "colour": 200,
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);


//logica por tras dos blocos
Blockly.JavaScript.forBlock["hello_world"] = () => {
  return `console.log('Hello World')`;
}

//tem que mudar pq  o turn left seria apenas trocar a imagem da personagem entao o go_forward tem que analisar para qual lado a personagem está virada e asim descobrir para qual lado seguir... ou algo assim
Blockly.JavaScript.forBlock["go_forward"] = () => {
  return `
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
      abrirGameOver();
      return;
    } else if (destino.some(d => d.x === gridprox.x && d.y === gridprox.y)) {
      abrirVitoria();
      return;
    } else {
      playerX = nextX;
      playerY = nextY;
      player.style.left = playerX + "px";
      player.style.top = playerY + "px";
    }
  `;
};


// o vira para a esquerda por enquanto so funciona caso o "para frente" seja "seta para a direita"
Blockly.JavaScript.forBlock["turn_left"] = () => {
  return `
    await sleep(400);

    if (direcaoAtual === 'direita') direcaoAtual = 'cima';
    else if (direcaoAtual === 'cima') direcaoAtual = 'esquerda';
    else if (direcaoAtual === 'esquerda') direcaoAtual = 'baixo';
    else if (direcaoAtual === 'baixo') direcaoAtual = 'direita';

    // Aqui a gnt muda a foto da personagem com:
    // player.style.transform = dependendo da direcaoAtual
  `;
};





//onde adicionamos a toolbox no espaco da div
const workspace = Blockly.inject(
  document.getElementById('drag'),
  {
    toolbox
  });


//botao para rodar 
const btnRodar = document.getElementById("btn_rodar");
btnRodar.addEventListener("click", async () => {
  playerX = startColIndex * step;
  playerY = startRowIndex * step;
  await sleep(400);
  const script = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(script);
  await eval(`(async () => { ${script} })()`);
});
