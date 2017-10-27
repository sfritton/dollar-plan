import React from "react";

import Budget from "../budget/budget";
import Page from "../page/page";
import Welcome from "../welcome/welcome";
import pageEnum from "../../util/page-enum";

("use strict");

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: props.page, budget: props.budget };
  }
  renderBudget() {
    return (
      <Budget
        date={this.state.budget.date}
        incomes={this.state.budget.incomes}
        expenses={this.state.budget.expenses}
      />
    );
  }
  render404() {
    return <Page header={"Error 404: page not found"} />;
  }
  render() {
    switch (this.state.page) {
      case pageEnum.BUDGET:
        return this.renderBudget();
      case pageEnum.WELCOME:
        return <Welcome />;
      default:
        return this.render404();
    }
  }
}

export default Root;
