import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import HeaderDropdown from "../../forms/header-dropdown";

("use strict");

const ONE_DAY = 1000 * 60 * 60 * 24; // one day in milliseconds

class BudgetHeader extends React.Component {
  render() {
    return (
      <div className="nav">
        <HeaderDropdown
          options={this.props.otherBudgets.map(budget => ({
            id: `${budget.year}${budget.month}`,
            name: `${this.getMonthName(budget.month)} ${budget.year}`
          }))}
        />
        {this.renderDaysLeft()}
      </div>
    );
  }
  renderDaysLeft() {
    const today = new Date();

    if (today.getTime() < this.getFirstDayOfBudgetMonth().getTime()) {
      return "Month has not started";
    }

    if (today.getTime() > this.getFirstDayOfNextMonth().getTime() - ONE_DAY) {
      return "Month has ended";
    }

    return `${this.daysBetween(
      today,
      this.getFirstDayOfNextMonth()
    )} days left`;
  }
  getFirstDayOfBudgetMonth() {
    // javascript Date months go from 0 to 11 rather than 1 to 12
    return new Date(this.props.year, this.props.month - 1, 1);
  }
  getFirstDayOfNextMonth() {
    let year = this.props.year;
    let month = this.props.month;

    month = month % 12; // map month to the next month

    // increment year if next month is January
    if (month === 0) {
      year++;
    }

    return new Date(year, month, 1); // first day of next month
  }
  daysBetween(date1, date2) {
    // Convert both dates to milliseconds
    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    let difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / ONE_DAY);
  }
  getMonthName(month) {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Frittembruary";
    }
  }
}

export default BudgetHeader;
