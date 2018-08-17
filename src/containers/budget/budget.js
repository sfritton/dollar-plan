import React, { Component } from "react";
import { connect } from "react-redux";

import * as BudgetActions from "../../actions/budget-actions";
import * as CategoryActions from "../../actions/category-actions";
import * as UIActions from "../../actions/ui-actions";
import Pages from "../../constants/pages-enum";
import Page from "../../components/page/page";
import Row from "../../components/row/row";
import SubCategory from "../../components/sub-category/sub-category";
import Category from "../../components/category/category";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import DollarService from "../../services/dollar-service";

class Budget extends Component {
  render() {
    if (!this.props.budget) {
      return <Page header={this.renderHeader()} />;
    }

    return (
      <Page
        header={this.renderHeader(this.props.budget.date)}
        footer={this.renderFooter()}
      >
        <section>
          <h2>Income</h2>
          {this.renderIncomes()}
          {this.props.edit && (
            <Row
              clickable
              onClick={() =>
                this.props.dispatch(BudgetActions.addIncomeCategory())}
            >
              + add a category
            </Row>
          )}
        </section>

        <section>
          <h2>Expenses</h2>
          {this.renderExpenses()}
          {this.props.edit && (
            <Row
              clickable
              header
              onClick={() =>
                this.props.dispatch(BudgetActions.addExpenseCategory())}
            >
              + add a category group
            </Row>
          )}
        </section>
      </Page>
    );
  }

  renderHeader(date) {
    return (
      <Header
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
      <Footer
        message={this.getBalanceMessage()}
        editing={this.props.edit}
        primaryDefault={{ label: 'Adjust budget', onClick: () => this.props.dispatch(UIActions.setEdit(true)) }}
        primaryEditing={{ label: 'Save budget', onClick: () => {
          this.props.dispatch(UIActions.setEdit(false));
          this.props.dispatch(BudgetActions.saveBudget());
        }}}
        secondaryEditing={{ label: 'Cancel', onClick: () => {
          const { month, year } = this.props.budget.date;
          this.props.dispatch(UIActions.setEdit(false));
          this.props.dispatch(BudgetActions.getBudget(month, year));
        } }}
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
      return "Balance: -$" + DollarService.getCentString(balance) * -1;
    }

    return "Balance: $" + DollarService.getCentString(balance);
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

const mapStateToProps = state => ({
  edit: state.ui.edit,
  budget: state.budgets.budgets[state.budgets.activeBudgetIndex],
  budgetDates: state.budgets.budgets.map(budget => budget.date)
});

export default connect(mapStateToProps)(Budget);
