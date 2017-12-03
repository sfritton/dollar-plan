import * as fs from "fs";

import Actions from "./actions-enum";

const DATA_DIRECTORY = "data";

export function getAllBudgets() {
  return {
    type: Actions.GET_ALL_BUDGETS,
    payload: fs.readdirSync(DATA_DIRECTORY)
  };
}

export function getBudget(month, year) {
  return {
    type: Actions.GET_BUDGET,
    payload: fs.readFileSync(`${DATA_DIRECTORY}\\${year}-${month}.json`)
  };
}
