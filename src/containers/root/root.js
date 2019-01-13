import React, { Component } from "react";
import { connect } from "react-redux";

import { BUDGET, WELCOME, CATEGORY } from "Redux/ui/pages";
import Budget from "../budget/budget";
import Welcome from "../welcome/welcome";
import CategoryPage from "../category-page/category-page";
import { getAllBudgets as getAllBudgetsAction } from "Redux/budgets/actions";

const pages = {
  [BUDGET]: Budget,
  [WELCOME]: Welcome,
  [CATEGORY]: CategoryPage
};

class Root extends Component {
  componentDidMount() {
    this.props.getAllBudgets();
  }

  render() {
    const PageComponent = pages[this.props.page] || Budget;

    return <PageComponent />;
  }
}

const mapStateToProps = state => ({
  page: state.ui.page
});

const mapDispatchToProps = dispatch => ({
  getAllBudgets: () => dispatch(getAllBudgetsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
