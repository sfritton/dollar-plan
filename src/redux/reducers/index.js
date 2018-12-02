import { combineReducers } from "redux";

import budgetsReducer from "./budgets-reducer";
import uiReducer from "./ui-reducer";

export default combineReducers({
  budgets: budgetsReducer,
  ui: uiReducer
});
