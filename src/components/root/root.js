import React from "react";

import Budget from "../budget/budget";
import budget from "../../../data/2017-11";

("use strict");

class Root extends React.Component {
  render() {
    return (
      <div>
        <Budget
          date={budget.date}
          incomes={budget.incomes}
          expenses={budget.expenses}
        />
      </div>
    );
  }
}

export default Root;
