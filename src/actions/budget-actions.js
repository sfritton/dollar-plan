import * as fs from "fs";

import Actions from "../constants/actions-enum";

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

export function createNewBudget(month, year) {
  return {
    type: Actions.CREATE_NEW_BUDGET,
    payload: { month, year }
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
    payload: { directory: DATA_DIRECTORY }
  };
}

export function updateIncomeCategoryTitle(catId, title) {
  return {
    type: Actions.UPDATE_INCOME_CATEGORY_TITLE,
    payload: { catId, title }
  };
}

export function updateIncomeCategoryAmount(catId, amount) {
  return {
    type: Actions.UPDATE_INCOME_CATEGORY_AMOUNT,
    payload: { catId, amount }
  };
}

export function addIncomeCategory() {
  return {
    type: Actions.ADD_INCOME_CATEGORY,
    payload: {}
  };
}

export function deleteIncomeCategory(catId) {
  return {
    type: Actions.DELETE_INCOME_CATEGORY,
    payload: { catId }
  };
}

export function updateExpenseCategoryTitle(catId, title) {
  return {
    type: Actions.UPDATE_EXPENSE_CATEGORY_TITLE,
    payload: { catId, title }
  };
}

export function addExpenseCategory() {
  return {
    type: Actions.ADD_EXPENSE_CATEGORY,
    payload: {}
  };
}

export function deleteExpenseCategory(catId) {
  return {
    type: Actions.DELETE_EXPENSE_CATEGORY,
    payload: { catId }
  };
}

export function updateExpenseSubCategoryTitle(catId, subCatId, title) {
  return {
    type: Actions.UPDATE_EXPENSE_SUB_CATEGORY_TITLE,
    payload: { catId, subCatId, title }
  };
}

export function updateExpenseSubCategoryAmount(catId, subCatId, amount) {
  return {
    type: Actions.UPDATE_EXPENSE_SUB_CATEGORY_AMOUNT,
    payload: { catId, subCatId, amount }
  };
}

export function addExpenseSubCategory(catId) {
  return {
    type: Actions.ADD_EXPENSE_SUB_CATEGORY,
    payload: { catId }
  };
}

export function deleteExpenseSubCategory(catId, subCatId) {
  return {
    type: Actions.DELETE_EXPENSE_SUB_CATEGORY,
    payload: { catId, subCatId }
  };
}
