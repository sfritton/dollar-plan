import { DATA_DIRECTORY } from "../../constants";

const fs = jest.genMockFromModule("fs");

const mockFiles = {
  [DATA_DIRECTORY]: {
    "2018-01.json": {
      date: { month: 1, year: 2018 },
      categoryGroups: {}
    },
    "2018-02.json": {
      date: { month: 2, year: 2018 },
      categoryGroups: {}
    }
  }
};

function readdirSync(directoryPath) {
  return Object.keys(mockFiles[directoryPath] || {});
}

function readFileSync(filePath) {
  const [directory, file] = filePath.split(/\\/);
  return JSON.stringify((mockFiles[directory] || {})[file] || {});
}

fs.statSync = jest.fn();
fs.mkdirSync = jest.fn();
fs.readdirSync = jest.fn(readdirSync);
fs.readFileSync = jest.fn(readFileSync);

module.exports = fs;
