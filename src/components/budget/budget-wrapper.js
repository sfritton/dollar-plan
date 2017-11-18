import React from "react";

import Budget from "./budget";
import FileService from "../../services/file-service";

("use strict");

class BudgetWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.budget = FileService.readBudgetFromFile(
      props.date.month,
      props.date.year
    );
    this.dates = FileService.readBudgetList();
  }
  render() {
    return (
      <Budget
        otherBudgets={this.dates}
        date={this.budget.date}
        incomes={this.budget.incomes}
        expenses={this.budget.expenses}
      />
    );
  }
  formatDates(dates) {
    return dates.map(date => {
      var data = date.split(".")[0].split("-");
      return { year: parseInt(data[0]), month: parseInt(data[1]) };
    });
  }
}

export default BudgetWrapper;
