import { combineReducers } from "redux";

import budgetReducer from "./budget-reducer";
import pageReducer from "./page-reducer";

export default combineReducers({
  budgets: budgetReducer,
  page: pageReducer
});
