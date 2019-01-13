import { SET_PAGE, SET_EDITING } from "./actionTypes";
import { WELCOME, BUDGET, CATEGORY } from "./pages";

function setPage(page) {
  return {
    type: SET_PAGE,
    payload: { page }
  };
}

export function setWelcomePage() {
  return setPage(WELCOME);
}

export function setBudgetPage() {
  return setPage(BUDGET);
}

export function setCategoryPage() {
  return setPage(CATEGORY);
}

export function setEditing(editing) {
  return {
    type: SET_EDITING,
    payload: { editing }
  };
}
