import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";

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
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/budget/2017-11">Budget Nov-17</Link>
            </li>
          </ul>

          <Route exact path="/" render={() => <Redirect to="/budget" />} />
          <Route path="/budget/:date" component={Budget} />
          <Route exact path="/welcome" component={Welcome} />
        </div>
      </Router>
    );
  }
}

export default Root;
