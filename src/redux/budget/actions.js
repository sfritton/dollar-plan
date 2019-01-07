import Actions from "../actions/actions-enum";
import { SAVE_BUDGET } from "./actionTypes";

// Budget
export function saveBudget() {
  return {
    type: SAVE_BUDGET,
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

export function saveCategoryToBudget() {
  return (dispatch, getState) => {
    const { category } = getState();

    return dispatch({
      type: Actions.SAVE_CATEGORY_TO_BUDGET,
      payload: { category }
    });
  };
}
