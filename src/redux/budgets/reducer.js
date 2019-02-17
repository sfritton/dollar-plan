import produce from "immer";

import createReducer from "../helpers/createReducer";
import { GET_ALL_BUDGETS, GET_BUDGET } from "../actionTypes";
import { CREATE_NEW_BUDGET } from "./actionTypes";
import { encodeDate } from "Util/date";
import { generateBudget } from "../templates";

export function handleGetAllBudgets(state, { budgets }) {
  return budgets || {};
}

export function handleGetBudget(state, { budget, id }) {
  if (id === undefined) return state;

  return produce(state, draft => {
    draft[id] = budget;
  });
}

// TODO: WIP, test this and action
export function handleCreateNewBudget(state, { month, year, oldBudget }) {
  const date = encodeDate(month, year);
  const newBudgetExists = !!state[date];

  if (newBudgetExists) return state;

  if (!oldBudget) return { ...state, [date]: generateBudget({ month, year }) };

  const newBudget = produce(oldBudget, draft => {
    draft.date = { month, year };
    Object.values(draft.categoryGroups).forEach(categoryGroup =>
      Object.values(categoryGroup.categories).forEach(
        category => (category.transactions = [])
      )
    );
  });

  return { ...state, [date]: newBudget };
}

const actionHandlers = {
  [GET_ALL_BUDGETS]: handleGetAllBudgets,
  [GET_BUDGET]: handleGetBudget,
  [CREATE_NEW_BUDGET]: handleCreateNewBudget
};

const reducer = createReducer(actionHandlers);

export default reducer;
