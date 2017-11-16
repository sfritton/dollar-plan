import React from "react";
import * as fs from "fs";

import Budget from "./budget";

("use strict");

class BudgetWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.budget = JSON.parse(fs.readFileSync(`data\\${props.date}.json`));
    this.dates = this.formatDates(fs.readdirSync("data"));
    console.log(this.dates);
  }
  render() {
    return (
      <Budget
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
