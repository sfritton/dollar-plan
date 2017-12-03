import { connect } from "react-redux";

import Budget from "./budget";

const BudgetContainer = connect(store => ({
  budget: store.budgets[store.activeBudgetIndex]
}))(Budget);

export default BudgetContainer;
