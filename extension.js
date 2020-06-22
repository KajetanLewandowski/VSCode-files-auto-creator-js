const vscode = require("vscode");
const createComponent = require("./modules/ComponentCreator/ComponentCreator.js")
  .createComponent;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let createComponentCommand = vscode.commands.registerCommand(
    "componentautocreatorjs.createComponent",
    createComponent
  );

  context.subscriptions.push(createComponentCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
