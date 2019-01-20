import * as fs from "fs";
import produce from "immer";

import createReducer from "../helpers/createReducer";
import { GET_ALL_BUDGETS, GET_BUDGET } from "../actionTypes";
import { CREATE_NEW_BUDGET } from "./actionTypes";
import { encodeDate } from "Util/date";

const DATA_DIRECTORY = "data_new";

// TODO: refactor create new budget
export function handleGetAllBudgets(state, { budgets }) {
  return budgets || {};
}

export function handleGetBudget(state, { budget, id }) {
  if (id === undefined) return state;

  return produce(state, draft => {
    draft[id] = budget;
  });
}

function handleCreateNewBudget(state, payload) {
  const { month, year, oldMonth, oldYear } = payload;
  const newBudgetExists = state.budgets.some(
    ({ date }) => date.month === month && date.year === year
  );

  if (newBudgetExists) {
    return state;
  }

  const newBudget = {
    date: { month, year },
    incomes: [],
    expenses: [],
    loaded: true
  };

  if (oldMonth && oldYear) {
    let oldBudget = state.budgets.find(
      budget => budget.date.month === oldMonth && budget.date.year === oldYear
    );

    if (oldBudget) {
      if (!oldBudget.loaded) {
        oldBudget = JSON.parse(
          fs.readFileSync(
            `${DATA_DIRECTORY}\\${encodeDate(oldMonth, oldYear)}.json`
          )
        );
      }

      newBudget.incomes = oldBudget.incomes.map(income => ({
        ...income,
        transactions: []
      }));

      newBudget.expenses = oldBudget.expenses.map(expense => ({
        title: expense.title,
        subCategories: expense.subCategories.map(subCat => ({
          ...subCat,
          transactions: []
        }))
      }));
    }
  }

  const budgets = state.budgets.concat(newBudget);

  return {
    ...state,
    budgets,
    activeBudgetIndex: budgets.length - 1
  };
}

const actionHandlers = {
  [GET_ALL_BUDGETS]: handleGetAllBudgets,
  [GET_BUDGET]: handleGetBudget,
  [CREATE_NEW_BUDGET]: handleCreateNewBudget
};

const reducer = createReducer(actionHandlers);

export default reducer;
