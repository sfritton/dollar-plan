import React, { Component } from "react";
import { connect } from "react-redux";

import * as BudgetActions from "Redux/actions/budget-actions";
import * as CategoryActions from "Redux/actions/category-actions";
import * as UIActions from "Redux/actions/ui-actions";
import Pages from "Redux/actions/pages-enum";
import { Page, Row, SubCategory, Category, Header, Footer } from "Components";
import { getCentString } from "Util/currency";
import { decodeDate } from "Util/date";
import { objectToArray } from "Util";

class Budget extends Component {
  render() {
    if (!this.props.isBudgetLoaded) {
      return <Page header={this.renderHeader()} />;
    }

    return (
      <Page
        header={this.renderHeader(this.props.date)}
        footer={this.renderFooter()}
      >
        <section>
          <h2>Income</h2>
          {this.renderIncomes()}
          {this.props.editing && (
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
          {this.props.editing && (
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
        editing={this.props.editing}
        primaryDefault={{ label: 'Adjust budget', onClick: () => this.props.dispatch(UIActions.setEdit(true)) }}
        primaryEditing={{ label: 'Save budget', onClick: () => {
          this.props.dispatch(UIActions.setEdit(false));
          this.props.dispatch(BudgetActions.saveBudget());
        }}}
        secondaryEditing={{ label: 'Cancel', onClick: () => {
          const { month, year } = this.props.date;
          this.props.dispatch(UIActions.setEdit(false));
          this.props.dispatch(BudgetActions.getBudget(month, year));
        } }}
      />
    );
  }

  renderIncomes() {
    return Object.entries(this.props.incomes.categories)
      .map(([id, category]) => (
        <SubCategory
          key={id}
          income
          subCategory={category}
          updateTitle={title =>
            this.props.dispatch(
              BudgetActions.updateIncomeCategoryTitle(id, title)
            )}
          edit={this.props.editing}
          updateAmount={amount =>
            this.props.dispatch(
              BudgetActions.updateIncomeCategoryAmount(id, amount)
            )}
          updateNotes={notes =>
            this.props.dispatch(
              BudgetActions.updateIncomeCategoryNotes(id, notes)
            )}
          deleteSubCategory={() =>
            this.props.dispatch(BudgetActions.deleteIncomeCategory(id))}
          openCategory={() => {
            this.props.dispatch(CategoryActions.setActiveCategory(id));
            this.props.dispatch(UIActions.setPage(Pages.CATEGORY));
          }}
        />
      ));
  }

  renderExpenses() {
    return this.props.expenses
      .map(({ id, ...categoryGroup }) => (
        <Category
          key={id}
          edit={this.props.editing}
          defaultOpen
          categoryGroup={categoryGroup}
          deleteCategory={() =>
            this.props.dispatch(BudgetActions.deleteExpenseCategory(id))}
          updateTitle={title =>
            this.props.dispatch(
              BudgetActions.updateExpenseCategoryTitle(id, title)
            )}
          updateSubCategoryTitle={(subCatId, title) =>
            this.props.dispatch(
              BudgetActions.updateExpenseSubCategoryTitle(id, subCatId, title)
            )}
          updateSubCategoryAmount={(subCatId, amount) =>
            this.props.dispatch(
              BudgetActions.updateExpenseSubCategoryAmount(id, subCatId, amount)
            )}
          updateSubCategoryNotes={(subCatId, notes) =>
            this.props.dispatch(
              BudgetActions.updateExpenseSubCategoryNotes(id, subCatId, notes)
            )}
          addSubCategory={() =>
            this.props.dispatch(BudgetActions.addExpenseSubCategory(id))}
          deleteSubCategory={subCatId =>
            this.props.dispatch(
              BudgetActions.deleteExpenseSubCategory(id, subCatId)
            )}
          openSubCategory={subCatId => {
            this.props.dispatch(CategoryActions.setActiveCategory(id, subCatId));
            this.props.dispatch(UIActions.setPage(Pages.CATEGORY));
          }}
        />
      ));
  }

  getBalanceMessage() {
    if (this.props.editing) {
      return this.formatBalance(this.getPlannedBalance());
    }

    if (this.getPlannedBalance() != 0) {
      return "Budget is unbalanced";
    }

    return this.formatBalance(this.getActualBalance());
  }

  formatBalance(balance) {
    if (balance < 0) {
      return "Balance: -$" + getCentString(balance) * -1;
    }

    return "Balance: $" + getCentString(balance);
  }

  getActualBalance() {
    return this.getActualIncome() - this.getActualExpenses();
  }

  getPlannedBalance() {
    return this.getPlannedIncome() - this.getPlannedExpenses();
  }

  getActualIncome() {
    return Object.values(this.props.incomes.categories)
      .reduce((sum, category) => sum + this.reduceTransactions(category), 0);
  }

  reduceTransactions({ transactions }) {
    return transactions.reduce((sum, { amount }) => sum + amount, 0);
  }

  getPlannedIncome() {
    return Object.values(this.props.incomes.categories)
      .reduce((sum, { plannedAmount }) => sum + plannedAmount, 0);
  }

  getActualExpenses() {
    return this.props.expenses
      .reduce((sum, { categories }) =>
          sum +
          Object.values(categories)
            .reduce((sum, category) => sum + this.reduceTransactions(category), 0),
        0
      );
  }

  getPlannedExpenses() {
    return this.props.expenses
      .reduce((sum, { categories }) =>
          sum +
          Object.values(categories)
            .reduce((sum, { plannedAmount }) => sum + plannedAmount, 0),
        0
      );
  }
}

const mapStateToProps = state => ({
  editing: state.ui.edit,
  isBudgetLoaded: !!state.budget.date,
  date: state.budget.date,
  incomes: state.budget.categoryGroups ? state.budget.categoryGroups.income : {},
  expenses: objectToArray(state.budget.categoryGroups).filter(({ id }) => id !== 'income'),
  budgetDates: Object.keys(state.budgets)
    .sort()
    .reverse()
    .map(decodeDate)
});

export default connect(mapStateToProps)(Budget);
