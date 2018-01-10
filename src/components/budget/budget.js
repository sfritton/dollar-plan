import React from "react";
import { Glyphicon } from "react-bootstrap";

import * as BudgetActions from "../../actions/budget-actions";
import * as CategoryActions from "../../actions/category-actions";
import * as UIActions from "../../actions/ui-actions";
import Pages from "../../constants/pages-enum";
import Page from "../page/page";
import SubCategory from "../sub-category/sub-category";
import Category from "../category/category";
import CategoryButton from "../util/category-button";
import BudgetHeader from "./budget-header/budget-header";
import BudgetFooter from "./budget-footer/budget-footer";
import DollarService from "../../services/dollar-service";

export default class Budget extends React.Component {
  render() {
    if (!this.props.budget) {
      return <Page header={this.renderHeader()} />;
    }

    return (
      <Page
        header={this.renderHeader(this.props.budget.date)}
        footer={this.renderFooter()}
      >
        <div className="section-header">Income</div>
        {this.renderIncomes()}
        {this.props.edit ? (
          <CategoryButton
            subCategory
            onClick={() =>
              this.props.dispatch(BudgetActions.addIncomeCategory())}
          >
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
        <div className="section-header">Expenses</div>
        {this.renderExpenses()}
        {this.props.edit ? (
          <CategoryButton
            onClick={() =>
              this.props.dispatch(BudgetActions.addExpenseCategory())}
          >
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
      </Page>
    );
  }

  renderHeader(date) {
    return (
      <BudgetHeader
        budgetDates={this.props.budgetDates || []}
        date={date}
        setActiveBudget={(month, year) =>
          this.props.dispatch(BudgetActions.setActiveBudget(month, year))}
        createNewBudget={() =>
          this.props.dispatch(UIActions.setPage(Pages.WELCOME))}
      />
    );
  }

  renderFooter() {
    return (
      <BudgetFooter
        message={this.getBalanceMessage()}
        edit={this.props.edit}
        adjust={() => this.props.dispatch(UIActions.setEdit(true))}
        save={() => {
          this.props.dispatch(UIActions.setEdit(false));
          this.props.dispatch(BudgetActions.saveBudget());
        }}
        cancel={() => {
          const { month, year } = this.props.budget.date;
          this.props.dispatch(UIActions.setEdit(false));
          this.props.dispatch(BudgetActions.getBudget(month, year));
        }}
      />
    );
  }

  renderIncomes() {
    return this.props.budget.incomes.map((incomeCategory, i) => (
      <SubCategory
        key={i}
        income
        subCategory={incomeCategory}
        updateTitle={title =>
          this.props.dispatch(
            BudgetActions.updateIncomeCategoryTitle(i, title)
          )}
        edit={this.props.edit}
        updateAmount={amount =>
          this.props.dispatch(
            BudgetActions.updateIncomeCategoryAmount(i, amount)
          )}
        deleteSubCategory={() =>
          this.props.dispatch(BudgetActions.deleteIncomeCategory(i))}
        openCategory={() => {
          this.props.dispatch(CategoryActions.setActiveCategory(i));
          this.props.dispatch(UIActions.setPage(Pages.CATEGORY));
        }}
      />
    ));
  }

  renderExpenses() {
    return this.props.budget.expenses.map((expenseCategory, i) => (
      <Category
        key={i}
        edit={this.props.edit}
        defaultOpen
        category={expenseCategory}
        deleteCategory={() =>
          this.props.dispatch(BudgetActions.deleteExpenseCategory(i))}
        updateTitle={title =>
          this.props.dispatch(
            BudgetActions.updateExpenseCategoryTitle(i, title)
          )}
        updateSubCategoryTitle={(subCatId, title) =>
          this.props.dispatch(
            BudgetActions.updateExpenseSubCategoryTitle(i, subCatId, title)
          )}
        updateSubCategoryAmount={(subCatId, amount) =>
          this.props.dispatch(
            BudgetActions.updateExpenseSubCategoryAmount(i, subCatId, amount)
          )}
        addSubCategory={() =>
          this.props.dispatch(BudgetActions.addExpenseSubCategory(i))}
        deleteSubCategory={subCatId =>
          this.props.dispatch(
            BudgetActions.deleteExpenseSubCategory(i, subCatId)
          )}
        openSubCategory={subCatId => {
          this.props.dispatch(CategoryActions.setActiveCategory(i, subCatId));
          this.props.dispatch(UIActions.setPage(Pages.CATEGORY));
        }}
      />
    ));
  }

  getBalanceMessage() {
    if (this.props.edit) {
      return this.formatBalance(this.getPlannedBalance());
    }

    if (this.getPlannedBalance() != 0) {
      return "Budget is unbalanced";
    }

    return this.formatBalance(this.getActualBalance());
  }

  formatBalance(balance) {
    if (balance < 0) {
      return "Balance: -$" + DollarService.getDollarsAndCents(balance) * -1;
    }

    return "Balance: $" + DollarService.getDollarsAndCents(balance);
  }

  getActualBalance() {
    return this.getActualIncome() - this.getActualExpenses();
  }

  getPlannedBalance() {
    return this.getPlannedIncome() - this.getPlannedExpenses();
  }

  getActualIncome() {
    return this.props.budget.incomes.reduce(
      (sum, income) =>
        sum +
        income.transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ),
      0
    );
  }

  getPlannedIncome() {
    return this.props.budget.incomes.reduce(
      (sum, income) => sum + income.plannedAmount,
      0
    );
  }

  getActualExpenses() {
    return this.props.budget.expenses.reduce(
      (sum, expense) =>
        sum +
        expense.subCategories.reduce(
          (sum, subCat) =>
            sum +
            subCat.transactions.reduce(
              (sum, transaction) => sum + transaction.amount,
              0
            ),
          0
        ),
      0
    );
  }

  getPlannedExpenses() {
    return this.props.budget.expenses.reduce(
      (sum, expense) =>
        sum +
        expense.subCategories.reduce(
          (sum, subCat) => sum + subCat.plannedAmount,
          0
        ),
      0
    );
  }
}
