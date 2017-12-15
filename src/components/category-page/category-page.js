import React from "react";
import { Glyphicon } from "react-bootstrap";

import Page from "../page/page";
import Transaction from "../transaction/transaction";
import CategoryButton from "../util/category-button";
import CategoryFooter from "./category-footer/category-footer";
import SubCategory from "../sub-category/sub-category";
import DateService from "../../services/date-service";
import { setPage, setEdit } from "../../actions/ui-actions";
import * as CategoryActions from "../../actions/category-actions";
import { saveBudget } from "../../actions/budget-actions";
import Pages from "../../constants/pages-enum";

export default class CategoryPage extends React.Component {
  render() {
    return (
      <Page header={this.renderHeader()} footer={this.renderFooter()}>
        <div className="section-header">Transactions</div>
        {this.renderTransactions()}
        <CategoryButton
          subCategory
          onClick={() => {
            this.props.dispatch(CategoryActions.addTransaction());
            this.props.dispatch(setEdit(true));
          }}
        >
          <Glyphicon glyph="plus" /> Add a transaction
        </CategoryButton>
      </Page>
    );
  }

  renderHeader() {
    return (
      <div>
        <div className="category-header-left">{this.generateTitle()}</div>
        <div className="category-header-right">{this.generateMessage()}</div>
      </div>
    );
  }

  generateTitle() {
    return `${DateService.getMonthName(this.props.month)} ${this.props
      .year} - ${this.props.category.title}`;
  }

  generateMessage() {
    const actual = this.getActualAmount();
    const planned = this.props.category.plannedAmount;

    const baseMessage = `$${actual} of $${planned} `;

    return (
      <span>
        {baseMessage}
        <span className="accent">
          {this.generateDifference(actual, planned, this.props.income)}
        </span>
      </span>
    );
  }

  generateDifference(actual, planned, income) {
    if (actual <= planned) {
      return `($${(planned - actual).toFixed(0)} ${income ? "to go" : "left"})`;
    }

    return `($${(actual - planned).toFixed(0)} ${income ? "extra" : "over"})`;
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
    return this.props.category.transactions
      .sort((a, b) => DateService.compareDateStrings(a.date, b.date))
      .map((transaction, i) => (
        <Transaction
          key={i}
          transaction={transaction}
          edit={this.props.edit}
          updateDate={(month, day) =>
            this.props.dispatch(
              CategoryActions.updateTransactionDate({ month, day }, i)
            )}
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
