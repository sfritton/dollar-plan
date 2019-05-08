import React, { Component, Fragment } from "react";
import "./budget-picker.less";
import { connect } from "react-redux";

import { setBudgetPage } from "Redux/ui/actions";
import { getBudget } from "Redux/budgets/actions";
import { Button, Input } from "Components";
import { decodeDate, getMonthName } from "Util/date";

const matchesSearchTerm = ({ name }, searchTerm) => {
  if (searchTerm === "") return true;

  const searchRegex = new RegExp(searchTerm);

  return searchRegex.test(name.toLowerCase());
};

class BudgetPicker extends Component {
  constructor() {
    super();

    this.state = { searchTerm: "" };
  }
  render() {
    const { budgetDates, selectBudget } = this.props;
    const { searchTerm } = this.state;

    return (
      <Fragment>
        <h2>Choose a budget</h2>
        <Input
          className="budget-picker--typeahead"
          value={searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
          placeholder="Filter"
        />
        <div className="budget-picker--budgets-container">
          {budgetDates.reduce((acc, { id, name, month, year }) => {
            const matches = matchesSearchTerm({ name }, searchTerm);
            if (!matches) return acc;

            return [
              ...acc,
              <Button
                key={id}
                outlined
                className="budget-picker--budget-btn"
                onClick={() => selectBudget(month, year)}
              >
                {name}
              </Button>
            ];
          }, [])}
        </div>
      </Fragment>
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
  selectBudget: (month, year) => {
    dispatch(getBudget(month, year));
    dispatch(setBudgetPage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPicker);
