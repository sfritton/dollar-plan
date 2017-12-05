import { combineReducers } from "redux";

import budgetReducer from "./budget-reducer";
import uiReducer from "./ui-reducer";

export default combineReducers({
  budgets: budgetReducer,
  ui: uiReducer
});
