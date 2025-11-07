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

//logica por tras dos blocos
Blockly.JavaScript.forBlock["hello_world"] = () =>{
    return `console.log('Hello World')`;
}

//onde adicionamos a toolbox no espaco da div
const workspace = Blockly.inject(
    document.getElementById('drag'),
    {
        toolbox
    });

//botao para rodar 
const btnRodar = document.getElementById("btn_rodar");
btnRodar.addEventListener("click",()=>{
    const script = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(script);
    eval(script);
})
