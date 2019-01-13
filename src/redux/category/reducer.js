import produce from "immer";

import {
  SET_ACTIVE_CATEGORY,
  UPDATE_TRANSACTION,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from "./actionTypes";
import { getClosestToToday } from "Util/date";

const getDefaultTransaction = (id, targetDate) => ({
  id,
  amount: 0,
  date: getClosestToToday(targetDate).getDate(),
  description: ""
});

export const getMaxId = (array = []) =>
  Math.max(
    -1,
    ...array.map(({ id }) => parseInt(id, 10)).filter(id => !isNaN(id))
  );

export function handleSetActiveCategory(state, { catId, groupId, category }) {
  return { ...category, id: catId, groupId };
}

export function handleUpdateTransaction(state, { id, ...details }) {
  return produce(state, draft => {
    const index = draft.transactions.findIndex(t => t.id === id);

    if (index === -1) return state;

    draft.transactions[index] = { ...draft.transactions[index], ...details };
  });
}

export function handleDeleteTransaction(state, { id }) {
  return produce(state, draft => {
    draft.transactions = draft.transactions.filter(t => t.id !== id);
  });
}

export function handleAddTransaction(state, { date }) {
  const id = getMaxId(state.transactions) + 1;

  return produce(state, draft => {
    draft.transactions.push(getDefaultTransaction(id, date));
  });
}

const actionHandlers = {
  [SET_ACTIVE_CATEGORY]: handleSetActiveCategory,
  [UPDATE_TRANSACTION]: handleUpdateTransaction,
  [DELETE_TRANSACTION]: handleDeleteTransaction,
  [ADD_TRANSACTION]: handleAddTransaction
};

export default function reducer(state = {}, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
}
