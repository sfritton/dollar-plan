import {
  SET_ACTIVE_CATEGORY,
  UPDATE_TRANSACTION,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from "./actionTypes";
import { getClosestToDate } from "Util/date";

export function setActiveCategory(groupId, catId) {
  return (dispatch, getState) => {
    const state = getState();
    const category = state.budget.categoryGroups[groupId].categories[catId];

    return dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: { groupId, catId, category }
    });
  };
}

export function resetCategory() {
  return (dispatch, getState) => {
    const state = getState();
    const { groupId, id } = state.category;
    const category = state.budget.categoryGroups[groupId].categories[id];

    return dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: { groupId, catId: id, category }
    });
  };
}

export function updateTransactionDate(targetDay, id) {
  return (dispatch, getState) => {
    const state = getState();
    const { month, year } = state.budget.date;
    const targetDate = new Date(year, month - 1, targetDay);

    const date = getClosestToDate(month, year, targetDate).getDate();

    return dispatch({
      type: UPDATE_TRANSACTION,
      payload: { date, id }
    });
  };
}

export function updateTransactionDescription(description, id) {
  return {
    type: UPDATE_TRANSACTION,
    payload: { description, id }
  };
}

export function updateTransactionAmount(amount, id) {
  return {
    type: UPDATE_TRANSACTION,
    payload: { amount, id }
  };
}

export function deleteTransaction(id) {
  return {
    type: DELETE_TRANSACTION,
    payload: { id }
  };
}

export function addTransaction() {
  return (dispatch, getState) => {
    const state = getState();
    const { date } = state.budget;

    return dispatch({
      type: ADD_TRANSACTION,
      payload: { date }
    });
  };
}
