import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Page from "../page/page";
import Transaction from "../transaction/transaction";
import SubCategory from "../sub-category/sub-category";
import DateService from "../../services/date-service";

export default class CategoryPage extends React.Component {
  render() {
    return (
      <Page header={this.renderHeader()}>
        <div className="section-header">Transactions</div>
        {this.props.category.transactions.map((transaction, i) => (
          <Transaction key={i} transaction={transaction} />
        ))}
      </Page>
    );
  }

  renderHeader() {
    return (
      <div>
        <div>{this.generateTitle()}</div>
            // text-align: right;
            // float: right;
            // padding-right: 15px;
        <div>{this.generateMessage()}</div>
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

    const baseMessage = `$${actual} of $${planned} ($`;

    if (actual <= planned) {
      return (
        baseMessage +
        (planned - actual).toFixed(0) +
        (this.props.income ? " to go" : " left") +
        ")"
      );
    }

    return (
      baseMessage +
      (actual - planned).toFixed(0) +
      (this.props.income ? " extra" : " over") +
      ")"
    );
  }

  getActualAmount() {
    return this.props.category.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }
}
