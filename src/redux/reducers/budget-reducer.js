import * as fs from "fs";

import Actions from "../actions/actions-enum";
import {
  encodeDate,
  decodeDate,
  compareDateStrings,
  getClosestToDate,
  getClosestToToday
} from "Util/date";

const DATA_DIRECTORY = "data_new";
const getMaxObjectKey = obj => Math.max(...Object.keys(obj));

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
  if (!state.categoryGroups[groupId]) return state;

  const categories = { ...state.categoryGroups[groupId].categories };

  const maxId = getMaxObjectKey(categories);

  categories[maxId + 1] = {
    title: '',
    notes: '',
    plannedAmount: 0,
    transactions: []
  };

  const budget = {
    ...state,
    categoryGroups: {
      ...state.categoryGroups,
      [groupId]: {
        ...state.categoryGroups[groupId],
        categories
      }
    }
  };

  return budget;
};

const actionHandlers = {
  [Actions.GET_BUDGET]: handleGetBudget,
  [Actions.ADD_CATEGORY]: handleAddCategory,
};

export default function reducer(state = {}, { type, payload }) {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
};
