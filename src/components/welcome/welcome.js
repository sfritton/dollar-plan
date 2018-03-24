import React from "react";
import { Grid, Row } from "react-bootstrap";

import Pages from "../../constants/pages-enum";
import Months from "../../constants/months";
import { createNewBudget } from "../../actions/budget-actions";
import { setPage, setEdit } from "../../actions/ui-actions";
import Dropdown from "../util/dropdown";
import Page from "../page/page";
import DateService from "../../services/date-service";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: Months[0].id,
      year: this.getNextTenYears()[0].id,
      copyOldBudget: false,
      oldDate: this.props.budgetDates[0].id
    };
  }
  render() {
    return (
      <Page header="New budget">
        <div className="padding-10" />
        <Grid>
          <Row>Select a month and a year for the new budget</Row>
          <Row>
            <Dropdown
              options={Months}
              selected={this.state.month}
              updateSelected={month =>
                this.setState({ month: parseInt(month) })}
            />
            <Dropdown
              options={this.getNextTenYears()}
              selected={this.state.year}
              updateSelected={year => this.setState({ year: parseInt(year) })}
            />
          </Row>
          <Row>
            <input
              type="checkbox"
              onChange={() =>
                this.setState(prevState => ({
                  copyOldBudget: !prevState.copyOldBudget
                }))}
            />{" "}
            Copy a previous budget
          </Row>
          {this.state.copyOldBudget && (
            <Row>
              <Dropdown
                options={this.props.budgetDates}
                selected={this.state.oldDate.id}
                updateSelected={date => this.setState({ oldDate: date })}
              />
            </Row>
          )}
          <Row>
            <button
              className="submit"
              onClick={() => {
                if (this.state.copyOldBudget) {
                  const oldDate = DateService.decodeDate(this.state.oldDate);
                  this.props.dispatch(
                    createNewBudget(
                      this.state.month,
                      this.state.year,
                      oldDate.month,
                      oldDate.year
                    )
                  );
                } else {
                  this.props.dispatch(
                    createNewBudget(this.state.month, this.state.year)
                  );
                }

                this.props.dispatch(setEdit(true));
                this.props.dispatch(setPage(Pages.BUDGET));
              }}
            >
              Create
            </button>
          </Row>
        </Grid>
      </Page>
    );
  }

  renderTitle() {
    return (
      <span>
        Welcome to <span className="accent">$</span>Plan
      </span>
    );
  }

  getNextTenYears() {
    const currentYear = new Date().getFullYear();

    return new Array(10)
      .fill(0)
      .map((elem, i) => ({ id: i + currentYear, name: i + currentYear }));
  }
}
