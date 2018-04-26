import React from "react";
import "./budget-header.less";

import HeaderDropdown from "../../util/header-dropdown";
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

const mapDateToOption = date => {
  if (!date) return null;

  return {
    ...date,
    name: `${DateService.getMonthName(date.month)} ${date.year}`
  };
};

const BudgetHeader = ({
  date,
  budgetDates,
  createNewBudget,
  setActiveBudget
}) => (
  <div>
    <HeaderDropdown
      selected={mapDateToOption(date)}
      options={budgetDates.map(date => mapDateToOption(date))}
      createNewBudget={() => createNewBudget()}
      setActiveBudget={(month, year) => setActiveBudget(month, year)}
    />
    <h2 className="nav-message">{getDaysLeftMessage(date)}</h2>
  </div>
);

export default BudgetHeader;
