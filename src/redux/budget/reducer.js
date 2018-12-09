import * as fs from "fs";
import produce from 'immer';

import Actions from "../actions/actions-enum";
import {
  encodeDate,
  decodeDate,
  compareDateStrings,
  getClosestToDate,
  getClosestToToday
} from "Util/date";

const DATA_DIRECTORY = "data_new";

const getDefaultCategory = () => ({
  title: '',
  notes: '',
  plannedAmount: 0,
  transactions: []
});

export const getMaxObjectKey = obj =>
  Math.max(
    -1,
    ...Object.keys(obj)
      .filter(key => !isNaN(parseInt(key, 10)))
  );

export function handleGetBudget(state, { month, year }) {
  const budget = JSON.parse(
    fs.readFileSync(
      `${DATA_DIRECTORY}\\${encodeDate(month, year)}.json`
    )
  );

  budget.isLoaded = true;

  return budget;
};

export function handleAddCategory(state, { groupId }) {
  return produce(state, draft => {
    const group = draft.categoryGroups[groupId];

    if (!group) return;

    const { categories } = group;

    const maxId = getMaxObjectKey(categories);

    categories[maxId + 1] = getDefaultCategory();
  });
};

export function handleAddCategoryGroup(state) {
  return produce(state, draft => {
    const { categoryGroups } = draft;

    const maxId = getMaxObjectKey(categoryGroups);

    categoryGroups[maxId + 1] = {
      title: "",
      categories: {
        "0": getDefaultCategory()
      }
    };
  });
};

const actionHandlers = {
  [Actions.GET_BUDGET]: handleGetBudget,
  [Actions.ADD_CATEGORY]: handleAddCategory,
  [Actions.ADD_CATEGORY_GROUP]: handleAddCategoryGroup
};

export default function reducer(state = {}, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
};
