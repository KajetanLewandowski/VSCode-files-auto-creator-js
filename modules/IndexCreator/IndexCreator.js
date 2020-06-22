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
  readFile(`./templates/${sourceFile}.txt`, (err, template) => {
    fs.readdir(destinationDirectory, (err, files) => {
      let fileContentToWrite = "";
      files.forEach((file) => {
        const fileName = path.parse(path.basename(file)).name;
        fileContentToWrite += template.split("$$name$$").join(fileName);
      });
      fs.writeFile(
        `${destinationDirectory}/${fileName}`,
        fileContentToWrite,
        () => {}
      );
    });
  });
};

const createIndex = async () => {
  const userClipboardContent = await vscode.env.clipboard.readText();
  await vscode.commands.executeCommand("copyFilePath");
  const selectedDirectory = await vscode.env.clipboard.readText();
  await vscode.env.clipboard.writeText(userClipboardContent);
  const componentName = path.basename(selectedDirectory);
  if (fs.existsSync(`${selectedDirectory}/index.js`)) {
    vscode.window.showErrorMessage(
      `index.js already exists in ${componentName}`
    );
    return;
  }
  vscode.window.showInformationMessage(
    `Creating index.js in ${componentName} started`
  );
  createFile("Index", selectedDirectory, componentName, `index.js`);
};

module.exports = {
  createIndex,
};
