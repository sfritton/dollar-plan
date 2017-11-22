import React from "react";
import { Glyphicon } from "react-bootstrap";

import BudgetWrapper from "../budget/budget-wrapper";
import Page from "../page/page";
import Welcome from "../welcome/welcome";

("use strict");

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: (
        <BudgetWrapper
          date={{ month: 11, year: 2017 }}
          navigateTo={(path, params) => this.navigateTo(path, params)}
        />
      ),
      path: "welcome",
      params: { date: { month: 11, year: 2017 } }
    };
  }
  render() {
    return this.state.page;
  }
  navigateTo(path, params) {
    if (path === "welcome") {
      this.updatePage(
        path,
        <Welcome navigateTo={(path, params) => this.navigateTo(path, params)} />
      );
    } else if (path === "budget" && params && params.date) {
      this.updatePage(
        path,
        <BudgetWrapper
          date={params.date}
          navigateTo={(path, params) => this.navigateTo(path, params)}
        />,
        params
      );
    } else if (path === "category" && params && params.date && params.name) {
      this.updatePage(
        path,
        <Page header={"Under Construction"}>
          <div>Come back soon!</div>
          <button className="submit" onClick={() => this.navigateBack()}>
            <Glyphicon glyph="chevron-left" /> back
          </button>
        </Page>,
        params
      );
    } else {
      this.updatePage(
        path,
        <Page header={"Error 404: Page not found"}>
          <button className="submit" onClick={() => this.navigateBack()}>
            <Glyphicon glyph="chevron-left" /> back
          </button>
        </Page>,
        params
      );
    }
  }
  updatePage(path, page, params) {
    this.setState(prevState => ({
      page: page,
      path: path,
      params: params || {},
      prevPath: prevState.path,
      prevParams: prevState.params
    }));
  }
  navigateBack() {
    this.navigateTo(this.state.prevPath, this.state.prevParams);
  }
}

export default Root;
