import Actions from "../constants/actions-enum";

export function setActiveCategory(catId, subCatId) {
  return {
    type: Actions.SET_ACTIVE_CATEGORY,
    payload: { catId, subCatId }
  };
}

export function saveCategoryToBudget() {
  return {
    type: Actions.SAVE_CATEGORY_TO_BUDGET,
    payload: {}
  };
}

export function updateTransactionDate(date) {
  return {
    type: Actions.UPDATE_TRANSACTION_DATE,
    payload: { date }
  };
}

export function updateTransactionDescription(description) {
  return {
    type: Actions.UPDATE_TRANSACTION_DESCRIPTION,
    payload: { description }
  };
}

export function updateTransactionAmount(amount) {
  return {
    type: Actions.UPDATE_TRANSACTION_AMOUNT,
    payload: { amount }
  };
}

export function addTransaction() {
  return {
    type: Actions.ADD_TRANSACTION,
    payload: {}
  };
}

export function deleteTransaction(id) {
  return {
    type: Actions.DELETE_TRANSACTION,
    payload: { id }
  };
}
