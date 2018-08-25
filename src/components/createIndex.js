const fs = require('fs');
const path = require('path');

const componentDir = path.resolve(__dirname);

const fileToComponentName = fileName =>
  fileName
    .replace(/^\w/, c => c.toUpperCase())
    .replace(/-\w/, c => c.toUpperCase().slice(1));

const filesToExports = files =>
  files
    .filter(file => !file.match(/(\.|util)/)) // filter out util folder and loose files
    .map(file => `export { default as ${fileToComponentName(file)} } from './${file}/${file}';`)
    .join('\n');

fs.readdir(componentDir, (err, files) => {
  if (err) {
    console.log('error reading:', err);
    return;
  }

  const exportStatements = filesToExports(files);

  fs.writeFile(`${componentDir}/index.js`, exportStatements, err => err && console.log('error writing:', err));
});
