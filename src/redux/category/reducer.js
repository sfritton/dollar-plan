import produce from 'immer';

import Actions from "../actions/actions-enum";

export function handleSetActiveCategory(state, { catId, groupId, category }) {
  return { ...category, id: catId, groupId };
}

const actionHandlers = {
  [Actions.SET_ACTIVE_CATEGORY]: handleSetActiveCategory
};

export default function reducer(state = {}, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
};
