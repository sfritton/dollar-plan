import * as fs from "fs";
import produce from "immer";

import createReducer from "../helpers/createReducer";
import { GET_BUDGET } from "../actionTypes";
import {
  SAVE_BUDGET,
  ADD_CATEGORY_GROUP,
  UPDATE_CATEGORY_GROUP_TITLE,
  ADD_CATEGORY,
  UPDATE_CATEGORY_DETAILS,
  SAVE_CATEGORY_TO_BUDGET
} from "./actionTypes";
import { encodeDate, compareDateStrings } from "Util/date";
import { DATA_DIRECTORY } from "../constants";
import { generateCategory, generateCategoryGroup } from "../templates";

export const getMaxObjectKey = obj =>
  Math.max(-1, ...Object.keys(obj).filter(key => !isNaN(parseInt(key, 10))));

export function handleGetBudget(state, { budget }) {
  return budget;
}

export function handleAddCategory(state, { groupId }) {
  return produce(state, draft => {
    const group = draft.categoryGroups[groupId];

    if (!group) return;

    const { categories } = group;

    const maxId = getMaxObjectKey(categories);

    categories[maxId + 1] = generateCategory();
  });
}

export function handleAddCategoryGroup(state) {
  return produce(state, draft => {
    const { categoryGroups } = draft;

    const maxId = getMaxObjectKey(categoryGroups);

    categoryGroups[maxId + 1] = generateCategoryGroup(true);
  });
}

export function handleSaveBudget(state) {
  const { date } = state;

  if (!date) return state;

  const fileName = encodeDate(date.month, date.year);

  fs.writeFileSync(
    `${DATA_DIRECTORY}\\${fileName}.json`,
    JSON.stringify({ ...state, isLoaded: undefined })
  );
  return state;
}

export function handleSaveCategoryToBudget(state, { category }) {
  const { groupId, id, ...details } = category;

  const newCategory = produce(details, draft => {
    if (!draft.transactions) return;

    draft.transactions.sort((a, b) => compareDateStrings(b.date, a.date));
  });

  return produce(state, draft => {
    const group = draft.categoryGroups[groupId];

    if (!group || !group.categories[id]) return;

    group.categories[id] = newCategory;
  });
}

export function handleUpdateCategoryGroupTitle(state, { groupId, title }) {
  return produce(state, draft => {
    const group = draft.categoryGroups[groupId];

    if (!group) return;

    group.title = title;
  });
}

export function handleUpdateCategoryDetails(
  state,
  { groupId, catId, ...details }
) {
  return produce(state, draft => {
    const group = draft.categoryGroups[groupId];

    if (!group || !group.categories[catId]) return;

    group.categories[catId] = { ...group.categories[catId], ...details };
  });
}

const actionHandlers = {
  [GET_BUDGET]: handleGetBudget,
  [ADD_CATEGORY]: handleAddCategory,
  [ADD_CATEGORY_GROUP]: handleAddCategoryGroup,
  [SAVE_BUDGET]: handleSaveBudget,
  [SAVE_CATEGORY_TO_BUDGET]: handleSaveCategoryToBudget,
  [UPDATE_CATEGORY_GROUP_TITLE]: handleUpdateCategoryGroupTitle,
  [UPDATE_CATEGORY_DETAILS]: handleUpdateCategoryDetails
};

const reducer = createReducer(actionHandlers);

export default reducer;
