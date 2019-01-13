import {
  SAVE_BUDGET,
  ADD_CATEGORY_GROUP,
  UPDATE_CATEGORY_GROUP_TITLE,
  ADD_CATEGORY,
  UPDATE_CATEGORY_DETAILS,
  SAVE_CATEGORY_TO_BUDGET
} from "./actionTypes";

// Budget
export function saveBudget() {
  return {
    type: SAVE_BUDGET,
    payload: {}
  };
}

// Category Group
export function addCategoryGroup() {
  return {
    type: ADD_CATEGORY_GROUP,
    payload: {}
  };
}

export function updateCategoryGroupTitle(groupId, title) {
  return {
    type: UPDATE_CATEGORY_GROUP_TITLE,
    payload: { groupId, title }
  };
}

// Category
export function updateCategoryTitle(groupId, catId, title) {
  return {
    type: UPDATE_CATEGORY_DETAILS,
    payload: { groupId, catId, title }
  };
}

export function updateCategoryAmount(groupId, catId, plannedAmount) {
  return {
    type: UPDATE_CATEGORY_DETAILS,
    payload: { groupId, catId, plannedAmount }
  };
}

export function updateCategoryNotes(groupId, catId, notes) {
  return {
    type: UPDATE_CATEGORY_DETAILS,
    payload: { groupId, catId, notes }
  };
}

export function addCategory(groupId) {
  return {
    type: ADD_CATEGORY,
    payload: { groupId }
  };
}

export function saveCategoryToBudget() {
  return (dispatch, getState) => {
    const { category } = getState();

    return dispatch({
      type: SAVE_CATEGORY_TO_BUDGET,
      payload: { category }
    });
  };
}
