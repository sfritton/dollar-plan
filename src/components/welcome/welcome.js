import React from "react";
import { Grid, Row } from "react-bootstrap";
import _ from "lodash";

import Pages from "../../constants/pages-enum";
import Months from "../../constants/months";
import { setActiveBudget } from "../../actions/budget-actions";
import { setPage } from "../../actions/navigation-actions";
import Dropdown from "../util/dropdown";
import Page from "../page/page";

export default class Welcome extends React.Component {
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
            <Dropdown options={Months} />
            <Dropdown options={this.getNextTenYears()} />
            <button
              className="submit"
              onClick={() => {
                this.props.dispatch(setActiveBudget(10, 2017));
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
