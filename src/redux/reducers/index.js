import { combineReducers } from "redux";

import budgetsReducer from "./budgets-reducer";
import budgetReducer from "./budget-reducer";
import uiReducer from "./ui-reducer";

export default combineReducers({
  budgets: budgetsReducer,
  budget: budgetReducer,
  ui: uiReducer
});
