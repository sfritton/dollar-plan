import { combineReducers } from "redux";

import budgetsReducer from "./reducers/budgets-reducer";
import budgetReducer from "./budget/reducer";
import categoryReducer from "./category/reducer";
import uiReducer from "./reducers/ui-reducer";

export default combineReducers({
  budgets: budgetsReducer,
  budget: budgetReducer,
  category: categoryReducer,
  ui: uiReducer
});
