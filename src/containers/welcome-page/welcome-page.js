import React, { Component, Fragment } from "react";
import "./welcome-page.less";
import { connect } from "react-redux";

import { createNewBudget, getBudget } from "Redux/budgets/actions";
import { setBudgetPage, setEditing } from "Redux/ui/actions";
import { Button, Dropdown, Page } from "Components";
import { decodeDate, getMonthName, months } from "Util/date";

class WelcomePage extends Component {
  constructor() {
    super();

    this.state = { selectedDate: { value: 0 } };
  }
  render() {
    const { budgetDates } = this.props;
    const { selectedDate } = this.state;
    const hasBudgets = budgetDates.length > 0;
    return (
      <div className="welcome">
        <h1>Dollar Plan</h1>
        {hasBudgets && (
          <Fragment>
            <Button className="welcome--wide-btn">Choose a budget</Button>
            <div>or</div>
          </Fragment>
        )}
        <Button className="welcome--wide-btn" outlined={hasBudgets}>
          Create a new {hasBudgets ? "one" : "budget"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  budgetDates: Object.keys(state.budgets).map(encodedDate => {
    const date = decodeDate(encodedDate);

    return {
      value: encodedDate,
      name: `${getMonthName(date.month)} ${date.year}`
    };
  })
});

export default connect(mapStateToProps)(WelcomePage);
