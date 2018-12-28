import produce from 'immer';

import Actions from "../actions/actions-enum";

export function handleSetActiveCategory(state, { catId, groupId, category }) {
  return { ...category, id: catId, groupId };
}

export function handleUpdateTransactionDetails(state, { id, ...details }) {
  return produce(state, draft => {
    const index = draft.transactions.findIndex(t => t.id === id);

    if (index === -1) return state;

    draft.transactions[index] = { ...draft.transactions[index], ...details };
  });
}

const actionHandlers = {
  [Actions.SET_ACTIVE_CATEGORY]: handleSetActiveCategory,
  [Actions.UPDATE_TRANSACTION_DETAILS]: handleUpdateTransactionDetails
};

export default function reducer(state = {}, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
};
