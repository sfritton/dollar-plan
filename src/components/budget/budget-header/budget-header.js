import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import HeaderDropdown from "../../util/header-dropdown";
import DateService from "../../../services/date-service";

export default class BudgetHeader extends React.Component {
  render() {
    return (
      <div className="nav">
        <HeaderDropdown
          selected={this.mapDateToOption(this.props.date)}
          options={this.props.budgetDates.map(date =>
            this.mapDateToOption(date)
          )}
          createNewBudget={() => this.props.createNewBudget()}
          setActiveBudget={(month, year) =>
            this.props.setActiveBudget(month, year)}
        />
        <div className="days-left">{this.renderDaysLeft()}</div>
      </div>
    );
  }

  renderDaysLeft() {
    if (!this.props.date) {
      return "";
    }

    const { month, year } = this.props.date;

    if (!DateService.hasMonthStarted(month, year)) {
      return "Month has not started";
    }

    if (DateService.hasMonthEnded(month, year)) {
      return "Month has ended";
    }

    return `${DateService.getDaysLeft(month, year)} days left`;
  }

  mapDateToOption(date) {
    if (!date) {
      return null;
    }

    return {
      ...date,
      name: `${DateService.getMonthName(date.month)} ${date.year}`
    };
  }
}
