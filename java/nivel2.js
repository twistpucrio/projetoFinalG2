
const obstaculos = [
    //carro roxo 1
    {x: 5, y: 3},
    {x: 6, y: 3},

    //carro rosa 1
    {x: 6, y: 2},
    {x: 7, y: 2},


    //carro rosa 2
    {x: 15, y: 5},
    {x: 16, y: 5},

    //gato 1
    {x: 15, y: 1},

    //gato 2
    {x: 10, y: 4}
];



//blockly
const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // -----Blocos de comando ------------
  contents: [
    {
      kind: 'block',
      type: 'controls_repeat'
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
    go_forward: 7,
    controls_repeat: 2
  }
});