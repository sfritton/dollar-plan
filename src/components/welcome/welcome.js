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
  constructor(props) {
    super(props);

    console.log([...Array(5).keys()].map(elem => elem + 2017));
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
    const blankArray = new Array(10);
    console.log(blankArray);
    return blankArray.map((elem, i) => i + 2017);
  }
}

Welcome.years = [...Array(5).keys()].map(elem => elem + 2017);
