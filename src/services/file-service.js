import * as fs from "fs";

("use strict");

const DATA_DIRECTORY = "data";

class FileService {
  static encodeDate(month, year) {
    return `${year}-${month}`;
  }
  static decodeDate(dateStr) {
    let splitStr = dateStr.split(".")[0].split("-");
    return { year: parseInt(splitStr[0]), month: parseInt(splitStr[1]) };
  }
  static readBudgetFromFile(date) {
    return JSON.parse(fs.readFileSync(`${DATA_DIRECTORY}\\${date}.json`));
  }
  static writeBudgetToFile(budget) {
    // TODO: implement
  }
  static readBudgetList() {
    let fileNames = fs.readdirSync(DATA_DIRECTORY);
    return fileNames.map(dateStr => this.decodeDate(dateStr));
  }
}

export default FileService;
