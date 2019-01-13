import { BUDGET } from "./pages";
import { SET_PAGE, SET_EDITING } from "./actionTypes";

const initialState = { page: BUDGET, loading: false, editing: false };

export function handleSetPage(state, { page }) {
  return { ...state, page };
}

export function handleSetEditing(state, { editing }) {
  return { ...state, editing };
}

const actionHandlers = {
  [SET_PAGE]: handleSetPage,
  [SET_EDITING]: handleSetEditing
};

export default function reducer(state = initialState, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
}
