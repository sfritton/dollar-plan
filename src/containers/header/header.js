import React from "react";
import { connect } from "react-redux";
import "./header.less";

import { getBudget } from "Redux/budgets/actions";
import { setNewBudgetPage } from "Redux/ui/actions";
import { BUDGET } from "Redux/ui/pages";
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

const Header = ({
  date,
  budgetDates,
  createNewBudget,
  getBudget,
  disableNav
}) => (
  <div>
    <NavDropdown
      isActive={!disableNav}
      selected={date}
      options={budgetDates}
      createNewBudget={createNewBudget}
      setActiveBudget={(month, year) => getBudget(month, year)}
    />
    <h2 className="nav-message">{getDaysLeftMessage(date)}</h2>
  </div>
);

const mapStateToProps = state => ({
  disableNav: state.ui.page !== BUDGET,
  date: state.budget.date,
  budgetDates: Object.keys(state.budgets)
    .sort()
    .reverse()
    .map(decodeDate)
});

const mapDispatchToProps = dispatch => ({
  getBudget: (month, year) => dispatch(getBudget(month, year)),
  createNewBudget: () => dispatch(setNewBudgetPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
