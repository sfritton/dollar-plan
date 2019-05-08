import React, { Component, Fragment } from "react";
import "./welcome-page.less";
import { connect } from "react-redux";

import {
  setNewBudgetPage as setNewBudgetPageAction,
  setBudgetPage
} from "Redux/ui/actions";
import { getBudget } from "Redux/budgets/actions";
import { Button, Input } from "Components";
import { decodeDate, getMonthName, months } from "Util/date";

const matchesSearchTerm = ({ name }, searchTerm) => {
  if (searchTerm === "") return true;

  const searchRegex = new RegExp(searchTerm);

  return searchRegex.test(name.toLowerCase());
};

class WelcomePage extends Component {
  constructor() {
    super();

    this.state = { isChoosingBudget: false, searchTerm: "" };
  }
  render() {
    const { budgetDates, setNewBudgetPage, selectBudget } = this.props;
    const { isChoosingBudget, searchTerm } = this.state;
    const hasBudgets = budgetDates.length > 0;

    return (
      <div className="welcome">
        <h1 className="welcome--title">Dollar Plan</h1>
        {isChoosingBudget ? (
          <Fragment>
            <h2>Choose a budget</h2>
            <Input
              className="welcome--typeahead"
              value={searchTerm}
              onChange={e => this.setState({ searchTerm: e.target.value })}
              placeholder="Filter"
            />
            <div className="welcome--budgets-container">
              {budgetDates.reduce((acc, { id, name, month, year }) => {
                const matches = matchesSearchTerm({ name }, searchTerm);
                if (!matches) return acc;

                return [
                  ...acc,
                  <Button
                    key={id}
                    outlined
                    className="welcome--budget-btn"
                    onClick={() => selectBudget(month, year)}
                  >
                    {name}
                  </Button>
                ];
              }, [])}
            </div>
          </Fragment>
        ) : (
          <div className="welcome--fade-in">
            {hasBudgets && (
              <Fragment>
                <Button
                  className="welcome--wide-btn"
                  onClick={() => this.setState({ isChoosingBudget: true })}
                >
                  Choose a budget
                </Button>
                <div>or</div>
              </Fragment>
            )}
            <Button
              className="welcome--wide-btn"
              outlined={hasBudgets}
              onClick={setNewBudgetPage}
            >
              Create a new {hasBudgets ? "one" : "budget"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  budgetDates: Object.keys(state.budgets).map(encodedDate => {
    const { month, year } = decodeDate(encodedDate);

    return {
      id: encodedDate,
      name: `${getMonthName(month)} ${year}`,
      month,
      year
    };
  })
});

const mapDispatchToProps = dispatch => ({
  setNewBudgetPage: () => dispatch(setNewBudgetPageAction()),
  selectBudget: (month, year) => {
    dispatch(getBudget(month, year));
    dispatch(setBudgetPage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
