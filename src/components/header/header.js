import React from "react";
import "./header.less";

import NavDropdown from "./nav-dropdown";
import { hasMonthStarted, hasMonthEnded, getDaysLeft } from "Util/date";

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

const BudgetHeader = ({
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

export default BudgetHeader;
