const toolbox = {
  // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
  kind: 'flyoutToolbox',
  // The contents is the blocks and other items that exist in your toolbox.
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
    // You can add more blocks to this array.
  ]
};


Blockly.common.defineBlocksWithJsonArray([{
  "type": "hello_world",
  "message0": 'hello world',
  "colour": 160,
    "previousStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.JavaScript.forBlock["hello_world"] = () =>{
    return `console.log('Hello World')`;
}

const workspace = Blockly.inject(
    document.getElementById('drag'),
    {
        toolbox
    });
const btnRodar = document.getElementById("btn_rodar");
btnRodar.addEventListener("click",()=>{
    const script = Blockly.JavaScript.workspaceToCode(workspace);
    console.log(script);
    eval(script);
})
