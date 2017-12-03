import { connect } from "react-redux";

import Budget from "./budget";

const BudgetContainer = connect(store => ({
  budget: store.budgets[0]
}))(Budget);

export default BudgetContainer;
