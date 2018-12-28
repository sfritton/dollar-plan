import * as fs from "fs";
import Actions from "../actions/actions-enum";
import { encodeDate } from "Util/date";

const DATA_DIRECTORY = "data_new";

// Budget
export function getAllBudgets() {
  return {
    type: Actions.GET_ALL_BUDGETS,
    payload: {}
  };
}

export function getBudget(month, year) {
  return (dispatch, getState) => {
    const state = getState();
    const id = encodeDate(month, year);

    if (state.budgets[id] && state.budgets[id].isLoaded) {
      return dispatch({
        type: Actions.GET_BUDGET,
        payload: { budget: state.budgets[id] }
      });
    }

    const budget = JSON.parse(
      fs.readFileSync(
        `${DATA_DIRECTORY}\\${id}.json`
      )
    );

    budget.isLoaded = true;

    return dispatch({
      type: Actions.GET_BUDGET,
      payload: { budget, id }
    });
  }
}

export function createNewBudget(month, year, oldMonth, oldYear) {
  return {
    type: Actions.CREATE_NEW_BUDGET,
    payload: { month, year, oldMonth, oldYear }
  };
}

export function setActiveBudget(month, year) {
  return {
    type: Actions.SET_ACTIVE_BUDGET,
    payload: { month, year }
  };
}

export function saveBudget() {
  return {
    type: Actions.SAVE_BUDGET,
    payload: {}
  };
}

// Category Group
export function addCategoryGroup() {
  return {
    type: Actions.ADD_CATEGORY_GROUP,
    payload: {}
  };
}

export function updateCategoryGroupTitle(groupId, title) {
  return {
    type: Actions.UPDATE_CATEGORY_GROUP_TITLE,
    payload: { groupId, title }
  };
}

// Category
export function updateCategoryTitle(groupId, catId, title) {
  return {
    type: Actions.UPDATE_CATEGORY_DETAILS,
    payload: { groupId, catId, title }
  };
}

export function updateCategoryAmount(groupId, catId, plannedAmount) {
  return {
    type: Actions.UPDATE_CATEGORY_DETAILS,
    payload: { groupId, catId, plannedAmount }
  };
}

export function updateCategoryNotes(groupId, catId, notes) {
  return {
    type: Actions.UPDATE_CATEGORY_DETAILS,
    payload: { groupId, catId, notes }
  };
}

export function addCategory(groupId) {
  return {
    type: Actions.ADD_CATEGORY,
    payload: { groupId }
  };
}

export function deleteIncomeCategory(catId) {
  return {
    type: Actions.DELETE_INCOME_CATEGORY,
    payload: { catId }
  };
}

export function deleteExpenseCategory(catId) {
  return {
    type: Actions.DELETE_EXPENSE_CATEGORY,
    payload: { catId }
  };
}

export function deleteExpenseSubCategory(catId, subCatId) {
  return {
    type: Actions.DELETE_EXPENSE_SUB_CATEGORY,
    payload: { catId, subCatId }
  };
}
