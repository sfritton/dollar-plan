import Actions from "./actions-enum";

export function resetCategory() {
  return {
    type: Actions.RESET_CATEGORY,
    payload: {}
  };
}
