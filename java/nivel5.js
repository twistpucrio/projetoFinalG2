const obstaculos = [
    // Carro roxo (topo centro)
    {x: 5,  y: 2}, {x: 6,  y: 2},

    //carro rosa distante
    {x: 14, y: 1}, {x: 15, y: 1},

    // Carro rosa 
    {x: 4, y: 5}, {x: 5, y: 5},

    // Carro rosa escuro
    {x: 2,  y: 3}, {x: 3,  y: 3},

    // Carro roxo (meio centro)
    {x: 9,  y: 3}, {x: 10, y: 3},

    // Gato
    {x: 8, y: 3},

    // Carro vermelho
    {x: 10,  y: 4}, {x: 11, y: 4},

    // Cachorro
    {x: 10, y: 5},


    // Carro verde (fundo direita)
    {x: 14, y: 5}, {x: 15, y: 5},
];


//blockly
const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // -----Blocos de comando ------------
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
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
  ]
};


//onde adicionamos a toolbox no espaco da div e fazemos limites
const workspace = Blockly.inject(document.getElementById('drag'), {
  toolbox, 
  maxInstances: {
    go_forward: 4,
    controls_repeat: 1,
    controls_if: 1
  }
});