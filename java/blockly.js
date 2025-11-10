
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
      type: 'bloqueio'
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
  "type": "bloqueio",
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

Blockly.JavaScript.forBlock["go_forward"] = () => {
  return `
    await sleep(400); // espera 400 ms entre movimentos
    let nextX = playerX + step;

    if (nextX <= limitMaxH) {
      let gridprox = {
        x: Math.round(nextX / step),
        y: Math.round(playerY / step)
      };

      if (obstaculos.some(o => o.x === gridprox.x && o.y === gridprox.y)) {
        abrirGameOver();
        return;
      } else if (destino.some(d => d.x === gridprox.x && d.y === gridprox.y)) {
        abrirVitoria();
        return;
      } else {
        playerX = nextX;
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
      }
    }
  `;
};

Blockly.JavaScript.forBlock["turn_left"] = () => {
  return ` await sleep(400); // espera 400 ms entre movimentos
    let nextY = playerY - step;

    if (nextY >= limitMinV) {
      let gridprox = {
        x: Math.round(playerX / step),
        y: Math.round(nextY / step)
      };

      if (obstaculos.some(o => o.x === gridprox.x && o.y === gridprox.y)) {
        abrirGameOver();
        return;
      } else if (destino.some(d => d.x === gridprox.x && d.y === gridprox.y)) {
        abrirVitoria();
        return;
      } else {
        playerY = nextY;
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
      }
    }`;
}




//onde adicionamos a toolbox no espaco da div
const workspace = Blockly.inject(
  document.getElementById('drag'),
  {
    toolbox
  });


//botao para rodar 
const btnRodar = document.getElementById("btn_rodar");
btnRodar.addEventListener("click", async () => {
  const script = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(script);
  await eval(`(async () => { ${script} })()`);
});
  