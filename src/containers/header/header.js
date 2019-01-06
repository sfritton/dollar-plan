import React from "react";
import { connect } from "react-redux";
import "./header.less";

import * as BudgetActions from "Redux/budget/actions";
import * as UIActions from "Redux/ui/actions";
import Pages from "Redux/actions/pages-enum";
import NavDropdown from "./nav-dropdown";
import {
  hasMonthStarted,
  hasMonthEnded,
  getDaysLeft,
  decodeDate
} from "Util/date";

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

const Header = ({ date, budgetDates, createNewBudget, getBudget }) => (
  <div>
    <NavDropdown
      selected={date}
      options={budgetDates}
      createNewBudget={createNewBudget}
      setActiveBudget={(month, year) => getBudget(month, year)}
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
  getBudget: (month, year) => dispatch(BudgetActions.getBudget(month, year)),
  createNewBudget: () => dispatch(UIActions.setPage(Pages.WELCOME))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
