import Actions from "../actions/actions-enum";

export function setActiveCategory(groupId, catId, category) {
  return {
    type: Actions.SET_ACTIVE_CATEGORY,
    payload: { groupId, catId, category }
  };
}

export function updateTransactionDate(date, id) {
  return {
    type: Actions.UPDATE_TRANSACTION_DETAILS,
    payload: { date, id }
  };
}

export function updateTransactionDescription(description, id) {
  return {
    type: Actions.UPDATE_TRANSACTION_DETAILS,
    payload: { description, id }
  };
}

export function updateTransactionAmount(amount, id) {
  return {
    type: Actions.UPDATE_TRANSACTION_DETAILS,
    payload: { amount, id }
  };
}
