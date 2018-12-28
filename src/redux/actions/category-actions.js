import Actions from "./actions-enum";

export function setActiveCategory(groupId, catId, category) {
  return {
    type: Actions.SET_ACTIVE_CATEGORY,
    payload: { groupId, catId, category }
  };
}

export function saveCategoryToBudget() {
  return {
    type: Actions.SAVE_CATEGORY_TO_BUDGET,
    payload: {}
  };
}

export function resetCategory() {
  return {
    type: Actions.RESET_CATEGORY,
    payload: {}
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
