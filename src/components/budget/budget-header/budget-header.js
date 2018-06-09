import React from "react";
import "./budget-header.less";

import NavDropdown from "./nav-dropdown";
import DateService from "../../../services/date-service";

const getDaysLeftMessage = date => {
  if (!date) return "";

  const { month, year } = date;

  if (!DateService.hasMonthStarted(month, year)) {
    return "Month has not started";
  }

  if (DateService.hasMonthEnded(month, year)) {
    return "Month has ended";
  }

  return `${DateService.getDaysLeft(month, year)} days left`;
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
