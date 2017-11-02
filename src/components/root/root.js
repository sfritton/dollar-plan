import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import BudgetWrapper from "../budget/budget-wrapper";
import Welcome from "../welcome/welcome";
import SubCategoryEdit from "../sub-category-edit/sub-category-edit";

("use strict");

class Root extends React.Component {
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
            <li>
              <Link to="/budget/2017-10">Budget Oct-17</Link>
            </li>
            <li>
              <Link to="/budget/2017-10/edit">Edit Oct-17</Link>
            </li>
          </ul>

          <Route exact path="/" render={() => <Redirect to="/budget" />} />
          <Route path="/budget/:date/edit" component={SubCategoryEdit} />
          <Route exact path="/budget/:date" component={BudgetWrapper} />
          <Route exact path="/welcome" component={Welcome} />
        </div>
      </Router>
    );
  }
}

export default Root;
