const vscode = require("vscode");
const createComponent = require("./modules/ComponentCreator/ComponentCreator.js")
  .createComponent;
const createIndex = require("./modules/IndexCreator/IndexCreator.js")
  .createIndex;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let createComponentCommand = vscode.commands.registerCommand(
    "componentautocreatorjs.createComponent",
    createComponent
  );
  let createIndexCommand = vscode.commands.registerCommand(
    "componentautocreatorjs.createIndex",
    createIndex
  );

  context.subscriptions.push(createComponentCommand, createIndexCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
