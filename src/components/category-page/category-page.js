import React from "react";

import Page from "../page/page";
import Row from "../row/row";
import BudgetHeader from "../budget/budget-header/budget-header";
import CategoryHeader from "../category/category-header";
import Transaction from "../transaction/transaction";
import CategoryFooter from "./category-footer/category-footer";
import DateService from "../../services/date-service";
import { setPage, setEdit } from "../../actions/ui-actions";
import * as CategoryActions from "../../actions/category-actions";
import { saveBudget } from "../../actions/budget-actions";
import Pages from "../../constants/pages-enum";
import DollarService from "../../services/dollar-service";

export default class CategoryPage extends React.Component {
  render() {
    return (
      <Page header={this.renderHeader()} footer={this.renderFooter()}>
        <section>
          <h2>{this.props.superCategoryName}</h2>
          <CategoryHeader
            title={this.props.category.title}
            actualAmount={this.getActualAmount()}
            plannedAmount={this.props.category.plannedAmount}
            income={this.props.income}
          />
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

  renderHeader() {
    return (
      <BudgetHeader
        budgetDates={this.props.budgetDates || []}
        date={{ month: this.props.month, year: this.props.year }}
      />
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
      <CategoryFooter
        edit={this.props.edit}
        editTransactions={() => this.props.dispatch(setEdit(true))}
        saveTransactions={() => {
          this.props.dispatch(setEdit(false));
          this.props.dispatch(CategoryActions.saveCategoryToBudget());
          this.props.dispatch(saveBudget());
        }}
        back={() => this.props.dispatch(setPage(Pages.BUDGET))}
        cancel={() => {
          this.props.dispatch(CategoryActions.resetCategory());
          this.props.dispatch(setEdit(false));
        }}
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
