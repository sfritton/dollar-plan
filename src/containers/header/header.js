import React from "react";
import { connect } from "react-redux";
import "./header.less";

import * as BudgetActions from "Redux/actions/budget-actions";
import * as UIActions from "Redux/actions/ui-actions";
import Pages from "Redux/actions/pages-enum";
import NavDropdown from "./nav-dropdown";
import { hasMonthStarted, hasMonthEnded, getDaysLeft, decodeDate } from "Util/date";

const getDaysLeftMessage = date => {
  if (!date) return "";

  const { month, year } = date;

  if (!hasMonthStarted(month, year)) {
    return "Month has not started";
  }

  if (hasMonthEnded(month, year)) {
    return "Month has ended";
  }

  return `${getDaysLeft(month, year)} days left`;
};

const Header = ({
  date,
  budgetDates,
  createNewBudget,
  setActiveBudget
}) => (
  <div>
    <NavDropdown
      selected={date}
      options={budgetDates}
      createNewBudget={createNewBudget}
      setActiveBudget={(month, year) => setActiveBudget(month, year)}
    />
    <h2 className="nav-message">{getDaysLeftMessage(date)}</h2>
  </div>
);

const mapStateToProps = state => ({
  date: state.budget.date,
  budgetDates: Object.keys(state.budgets)
    .sort()
    .reverse()
    .map(decodeDate)
});

const mapDispatchToProps = dispatch => ({
  setActiveBudget: (month, year) =>
    dispatch(BudgetActions.setActiveBudget(month, year)),
  createNewBudget: () => dispatch(UIActions.setPage(Pages.WELCOME))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);