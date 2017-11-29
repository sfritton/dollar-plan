import * as fs from "fs";

("use strict");

const DATA_DIRECTORY = "data";

class FileService {
  constructor() {
    this.budgets = null;
  }

  getBudgets() {
    if (!this.budgets) {
      this.budgets = this.readBudgetsFromDirectory();
    }

    return this.budgets;
  }

  getBudgetDates() {
    if (!this.budgets) {
      this.budgets = this.readBudgetsFromDirectory();
    }

    return this.budgets.map(budget => ({
      month: budget.date.month,
      year: budget.date.year
    }));
  }

  writeBudgetToFile(budget) {
    // TODO: implement
  }

  readBudgetsFromDirectory() {
    return fs
      .readdirSync(DATA_DIRECTORY)
      .map(fileName =>
        JSON.parse(fs.readFileSync(`${DATA_DIRECTORY}\\${fileName}`))
      );
  }

  resetBudgets() {
    this.budgets = null;
  }
}

export default FileService;
