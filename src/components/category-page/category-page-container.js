import { connect } from "react-redux";

import CategoryPage from "./category-page";

const CategoryPageContainer = connect(store => {
  const budget = store.budgets.budgets[store.budgets.activeBudgetIndex];
  const { month, year } = budget.date;

  return {
    month,
    year,
    category: store.budgets.category
  };
})(CategoryPage);

export default CategoryPageContainer;
