import { connect } from "react-redux";

import Budget from "./budget";

const BudgetContainer = connect(store => ({
  edit: store.ui.edit,
  budget: store.budgets.budgets[store.budgets.activeBudgetIndex],
  budgetDates: store.budgets.budgets.map(budget => budget.date)
}))(Budget);

export default BudgetContainer;