import React from "react";
import { Grid, Row } from "react-bootstrap";

import Pages from "../../constants/pages-enum";
import Months from "../../constants/months";
import { createNewBudget } from "../../actions/budget-actions";
import { setPage, setEdit } from "../../actions/ui-actions";
import Dropdown from "../util/dropdown";
import Page from "../page/page";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: Months[0].id,
      year: this.getNextTenYears()[0].id
    };
  }
  render() {
    return (
      <Page header={this.renderTitle()}>
        <div className="padding-10" />
        <Grid>
          <Row>
            {"It looks like you don't have any budgets. " +
              "Would you like to create one?"}
          </Row>
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
            <button
              className="submit"
              onClick={() => {
                this.props.dispatch(
                  createNewBudget(this.state.month, this.state.year)
                );
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

Welcome.years = [...Array(5).keys()].map(elem => elem + 2017);
