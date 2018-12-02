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

export default function reducer(state = {}, { type, payload }) {
  switch(type) {
    case Actions.SET_ACTIVE_BUDGET:
      return handleSetActiveBudget(payload);
    default:
      return state;
  }
}

function handleSetActiveBudget({ month, year }) {
  const budget = JSON.parse(
    fs.readFileSync(
      `${DATA_DIRECTORY}\\${encodeDate(month, year)}.json`
    )
  );

  budget.isLoaded = true;

  return budget;
}
