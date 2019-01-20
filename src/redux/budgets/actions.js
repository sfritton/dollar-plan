import * as fs from "fs";
import { GET_ALL_BUDGETS, GET_BUDGET } from "../actionTypes";
import { CREATE_NEW_BUDGET } from "../actionTypes";
import { encodeDate } from "Util/date";

const DATA_DIRECTORY = "data_new";

export function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}

export function getAllBudgets() {
  checkDirectorySync(DATA_DIRECTORY);

  const budgets = {};

  fs.readdirSync(DATA_DIRECTORY).forEach(date => {
    budgets[date.replace(/\.json$/, "")] = { isLoaded: false };
  });

  return {
    type: GET_ALL_BUDGETS,
    payload: { budgets }
  };
}

export function getBudget(month, year) {
  return (dispatch, getState) => {
    const state = getState();
    const id = encodeDate(month, year);

    if (state.budgets[id] && state.budgets[id].isLoaded) {
      return dispatch({
        type: GET_BUDGET,
        payload: { budget: state.budgets[id] }
      });
    }

    const budget = JSON.parse(fs.readFileSync(`${DATA_DIRECTORY}\\${id}.json`));

    budget.isLoaded = true;

    return dispatch({
      type: GET_BUDGET,
      payload: { budget, id }
    });
  };
}

export function createNewBudget(month, year, oldMonth, oldYear) {
  return {
    type: CREATE_NEW_BUDGET,
    payload: { month, year, oldMonth, oldYear }
  };
}
