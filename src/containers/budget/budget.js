import React, { Component } from "react";
import { connect } from "react-redux";

import * as BudgetActions from "Redux/budget/actions";
import { getBudget } from "Redux/budgets/actions";
import * as UIActions from "Redux/ui/actions";
import { Page, Row, Footer } from "Components";
import Header from "../header/header";
import Category from "../category/category";
import CategoryGroup from "../category-group/category-group";
import { getCentString } from "Util/currency";
import { decodeDate } from "Util/date";
import { objectToArray } from "Util";

class Budget extends Component {
  render() {
    const {
      isBudgetLoaded,
      editing,
      incomes,
      expenses,
      addCategory,
      addCategoryGroup
    } = this.props;

    if (!isBudgetLoaded) {
      return <Page header={<Header />} />;
    }

    return (
      <Page header={<Header />} footer={this.renderFooter()}>
        <section>
          <h2>Income</h2>
          {Object.keys(incomes).map(id => (
            <Category key={id} income groupId="income" categoryId={id} />
          ))}
          {editing && (
            <Row clickable onClick={() => addCategory("income")}>
              + add a category
            </Row>
          )}
        </section>

        <section>
          <h2>Expenses</h2>
          {expenses.map(({ id }) => (
            <CategoryGroup key={id} groupId={id} defaultOpen />
          ))}
          {editing && (
            <Row clickable header onClick={addCategoryGroup}>
              + add a category group
            </Row>
          )}
        </section>
      </Page>
    );
  }

  renderFooter() {
    const { editing, adjustBudget, saveBudget, cancelEdit, date } = this.props;

    return (
      <Footer
        message={this.getBalanceMessage()}
        editing={editing}
        primaryDefault={{ label: "Adjust budget", onClick: adjustBudget }}
        primaryEditing={{ label: "Save budget", onClick: saveBudget }}
        secondaryEditing={{ label: "Cancel", onClick: () => cancelEdit(date) }}
      />
    );
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
    return Object.values(this.props.incomes).reduce(
      (sum, category) => sum + this.reduceTransactions(category),
      0
    );
  }

  reduceTransactions({ transactions }) {
    return transactions.reduce((sum, { amount }) => sum + amount, 0);
  }

  getPlannedIncome() {
    return Object.values(this.props.incomes).reduce(
      (sum, { plannedAmount }) => sum + plannedAmount,
      0
    );
  }

  getActualExpenses() {
    return this.props.expenses.reduce(
      (sum, { categories }) =>
        sum +
        Object.values(categories).reduce(
          (sum, category) => sum + this.reduceTransactions(category),
          0
        ),
      0
    );
  }

  getPlannedExpenses() {
    return this.props.expenses.reduce(
      (sum, { categories }) =>
        sum +
        Object.values(categories).reduce(
          (sum, { plannedAmount }) => sum + plannedAmount,
          0
        ),
      0
    );
  }
}

const mapStateToProps = state => ({
  editing: state.ui.edit,
  isBudgetLoaded: !!state.budget.date,
  date: state.budget.date,
  incomes: state.budget.categoryGroups
    ? state.budget.categoryGroups.income.categories
    : {},
  expenses: objectToArray(state.budget.categoryGroups).filter(
    ({ id }) => id !== "income"
  ),
  budgetDates: Object.keys(state.budgets)
    .sort()
    .reverse()
    .map(decodeDate)
});

const mapDispatchToProps = dispatch => ({
  addCategory: groupId => dispatch(BudgetActions.addCategory(groupId)),
  addCategoryGroup: () => dispatch(BudgetActions.addCategoryGroup()),
  adjustBudget: () => dispatch(UIActions.setEdit(true)),
  saveBudget: () => {
    dispatch(UIActions.setEdit(false));
    dispatch(BudgetActions.saveBudget());
  },
  cancelEdit: ({ month, year }) => {
    dispatch(UIActions.setEdit(false));
    dispatch(getBudget(month, year));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
