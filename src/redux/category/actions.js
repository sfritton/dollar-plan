import Actions from "../actions/actions-enum";
import { getClosestToDate } from "Util/date";

export function setActiveCategory(groupId, catId) {
  return (dispatch, getState) => {
    const state = getState();
    const category = state.budget.categoryGroups[groupId].categories[catId];

    return dispatch({
      type: Actions.SET_ACTIVE_CATEGORY,
      payload: { groupId, catId, category }
    });
  }
}

export function updateTransactionDate(targetDay, id) {
  return (dispatch, getState) => {
    const state = getState();
    const { month, year } = state.budget.date;
    const targetDate = new Date(year, month - 1, targetDay);

    const date = getClosestToDate(
      month,
      year,
      targetDate
    ).getDate();

    return dispatch({
      type: Actions.UPDATE_TRANSACTION_DETAILS,
      payload: { date, id }
    });
  }
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

export function deleteTransaction(id) {
  return {
    type: Actions.DELETE_TRANSACTION,
    payload: { id }
  };
}

export function addTransaction() {
  return (dispatch, getState) => {
    const state = getState();
    const { date } = state.budget;

    return dispatch({
      type: Actions.ADD_TRANSACTION,
      payload: { date }
    });
  }
}
