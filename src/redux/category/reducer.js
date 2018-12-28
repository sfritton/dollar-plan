import produce from 'immer';

import Actions from "../actions/actions-enum";

export function handleSetActiveCategory(state, { catId, groupId, category }) {
  return { ...category, id: catId, groupId };
};

export function handleUpdateTransactionDetails(state, { id, ...details }) {
  return produce(state, draft => {
    const index = draft.transactions.findIndex(t => t.id === id);

    if (index === -1) return state;

    draft.transactions[index] = { ...draft.transactions[index], ...details };
  });
};

export function handleDeleteTransaction(state, { id }) {
  return produce(state, draft => {
    draft.transactions = draft.transactions.filter(t => t.id !== id);
  });
};

const actionHandlers = {
  [Actions.SET_ACTIVE_CATEGORY]: handleSetActiveCategory,
  [Actions.UPDATE_TRANSACTION_DETAILS]: handleUpdateTransactionDetails,
  [Actions.DELETE_TRANSACTION]: handleDeleteTransaction
};

export default function reducer(state = {}, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
};
