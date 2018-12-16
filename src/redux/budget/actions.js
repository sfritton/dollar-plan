import Actions from "../actions/actions-enum";

// Budget
export function getAllBudgets() {
  return {
    type: Actions.GET_ALL_BUDGETS,
    payload: {}
  };
}

export function getBudget(month, year) {
  return {
    type: Actions.GET_BUDGET,
    payload: { month, year }
  };
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
    type: Actions.UPDATE_CATEGORY_TITLE,
    payload: { groupId, catId, title }
  };
}

export function updateIncomeCategoryAmount(catId, amount) {
  return {
    type: Actions.UPDATE_INCOME_CATEGORY_AMOUNT,
    payload: { catId, amount }
  };
}

export function updateIncomeCategoryNotes(catId, notes) {
  return {
    type: Actions.UPDATE_INCOME_CATEGORY_NOTES,
    payload: { catId, notes }
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

export function updateExpenseSubCategoryAmount(catId, subCatId, amount) {
  return {
    type: Actions.UPDATE_EXPENSE_SUB_CATEGORY_AMOUNT,
    payload: { catId, subCatId, amount }
  };
}

export function updateExpenseSubCategoryNotes(catId, subCatId, notes) {
  return {
    type: Actions.UPDATE_EXPENSE_SUB_CATEGORY_NOTES,
    payload: { catId, subCatId, notes }
  };
}

export function deleteExpenseSubCategory(catId, subCatId) {
  return {
    type: Actions.DELETE_EXPENSE_SUB_CATEGORY,
    payload: { catId, subCatId }
  };
}
