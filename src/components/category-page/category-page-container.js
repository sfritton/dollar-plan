import { connect } from "react-redux";

import CategoryPage from "./category-page";

const CategoryPageContainer = connect(store => {
  const budget = store.budgets.budgets[store.budgets.activeBudgetIndex];
  const { month, year } = budget.date;
  const income =
    store.budgets.activeCategoryKey.subCatId === null ||
    store.budgets.activeCategoryKey.subCatId === undefined;

  const superCategoryName = income
    ? "Income"
    : budget.expenses[store.budgets.activeCategoryKey.catId].title;

  return {
    month,
    year,
    category: store.budgets.category,
    edit: store.ui.edit,
    income,
    superCategoryName
  };
})(CategoryPage);

export default CategoryPageContainer;
