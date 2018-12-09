import React from "react";
import { connect } from "react-redux";

import { Page, Row, GroupHeader, Footer, Transaction } from "Components";
import Header from "../header/header";
import { setPage, setEdit } from "Redux/actions/ui-actions";
import * as CategoryActions from "Redux/actions/category-actions";
import { saveBudget } from "Redux/budget/actions";
import Pages from "Redux/actions/pages-enum";

class CategoryPage extends React.Component {
  render() {
    return (
      <Page header={<Header />} footer={this.renderFooter()}>
        <section>
          <h2>{this.props.superCategoryName}</h2>
          <GroupHeader
            title={this.props.category.title}
            actualAmount={this.getActualAmount()}
            plannedAmount={this.props.category.plannedAmount}
            income={this.props.income}
          />
          {this.props.category.notes && (
            <Row>
              <b>Notes:</b> {this.props.category.notes}
            </Row>
          )}
          {this.renderTransactions()}
          <Row
            clickable
            onClick={() => {
              this.props.dispatch(CategoryActions.addTransaction());
              this.props.dispatch(setEdit(true));
            }}
          >
            + Add a transaction
          </Row>
        </section>
      </Page>
    );
  }

  getActualAmount() {
    return this.props.category.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }

  renderFooter() {
    return (
      <Footer
        editing={this.props.edit}
        primaryDefault={{ label: 'Edit transactions', onClick: () => this.props.dispatch(setEdit(true)) }}
        primaryEditing={{ label: 'Save transactions', onClick: () => {
          this.props.dispatch(setEdit(false));
          this.props.dispatch(CategoryActions.saveCategoryToBudget());
          this.props.dispatch(saveBudget());
        } }}
        secondaryDefault={{ label: 'Back to budget', onClick: () => this.props.dispatch(setPage(Pages.BUDGET)) }}
        secondaryEditing={{ label: 'Cancel', onClick: () => {
          this.props.dispatch(CategoryActions.resetCategory());
          this.props.dispatch(setEdit(false));
        } }}
      />
    );
  }

  renderTransactions() {
    return this.props.category.transactions.map((transaction, i) => (
      <Transaction
        key={i}
        month={this.props.month}
        transaction={transaction}
        edit={this.props.edit}
        updateDate={date =>
          this.props.dispatch(CategoryActions.updateTransactionDate(date, i))}
        updateDescription={desc =>
          this.props.dispatch(
            CategoryActions.updateTransactionDescription(desc, i)
          )}
        updateAmount={amount =>
          this.props.dispatch(
            CategoryActions.updateTransactionAmount(amount, i)
          )}
        deleteTransaction={() => {
          this.props.dispatch(CategoryActions.deleteTransaction(i));
          this.props.dispatch(setEdit(true));
        }}
      />
    ));
  }
}

const mapStateToProps = state => {
  const budget = state.budgets.budgets[state.budgets.activeBudgetIndex];
  const { month } = budget.date;
  const income =
    state.budgets.activeCategoryKey.subCatId === null ||
    state.budgets.activeCategoryKey.subCatId === undefined;

  const superCategoryName = income
    ? "Income"
    : budget.expenses[state.budgets.activeCategoryKey.catId].title;

  return {
    month,
    category: state.budgets.category,
    edit: state.ui.edit,
    income,
    superCategoryName,
  };
};

export default connect(mapStateToProps)(CategoryPage);
