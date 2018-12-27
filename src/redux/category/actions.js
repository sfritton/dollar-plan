import Actions from "../actions/actions-enum";

export function setActiveCategory(groupId, catId, category) {
  return {
    type: Actions.SET_ACTIVE_CATEGORY,
    payload: { groupId, catId, category }
  };
}
