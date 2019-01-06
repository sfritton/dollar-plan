import Actions from "../actions/actions-enum";

export function setPage(page) {
  return {
    type: Actions.SET_PAGE,
    payload: { page }
  };
}

export function setEdit(edit) {
  return {
    type: Actions.SET_EDIT,
    payload: { edit }
  };
}
