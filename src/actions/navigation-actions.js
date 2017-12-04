import Actions from "../constants/actions-enum";

export function setPage(page) {
  return {
    type: Actions.SET_PAGE,
    payload: { page }
  };
}
