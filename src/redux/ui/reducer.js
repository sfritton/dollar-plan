import createReducer from "../helpers/createReducer";
import { BUDGET } from "./pages";
import { SET_PAGE, SET_EDITING } from "./actionTypes";

const initialState = { page: BUDGET, loading: false, editing: false };

// TODO: add tests
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

const reducer = createReducer(actionHandlers, initialState);

export default reducer;
