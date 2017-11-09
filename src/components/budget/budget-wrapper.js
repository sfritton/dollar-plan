import React from "react";
import * as fs from "fs";

import Budget from "./budget";

("use strict");

class BudgetWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(fs.readFileSync(`data\\${props.date}.json`));
  }
  render() {
    return (
      <Budget
        date={this.state.date}
        incomes={this.state.incomes}
        expenses={this.state.expenses}
      />
    );
  }
}

export default BudgetWrapper;
