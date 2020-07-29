const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

let readFile = (path, callback) => {
  const filename = require.resolve(path);
  return fs.readFile(filename, "utf8", callback);
};

let createFile = async (
  sourceFile,
  destinationDirectory,
  componentName,
  fileName
) => {
  if (fs.existsSync(`${destinationDirectory}/${fileName}`)) return;
  readFile(`./templates/${sourceFile}.txt`, (err, result) =>
    fs.writeFile(
      `${destinationDirectory}/${fileName}`,
      result.split("$$name$$").join(componentName),
      () => {}
    )
  );
};

const createComponent = async () => {
  const userClipboardContent = await vscode.env.clipboard.readText();
  await vscode.commands.executeCommand("copyFilePath");
  const selectedDirectory = await vscode.env.clipboard.readText();
  await vscode.env.clipboard.writeText(userClipboardContent);
  const componentName = path.basename(selectedDirectory);
  vscode.window.showInformationMessage(
    `Creating component ${componentName} started`
  );
  createFile(
    "Component",
    selectedDirectory,
    componentName,
    `${componentName}.tsx`
  );
  createFile("Index", selectedDirectory, componentName, `index.ts`);
  createFile(
    "Styles",
    selectedDirectory,
    componentName,
    `${componentName}.css.tsx`
  );
  createFile(
    "Types",
    selectedDirectory,
    componentName,
    `${componentName}.d.ts`
  );
};

module.exports = {
  createComponent,
};
