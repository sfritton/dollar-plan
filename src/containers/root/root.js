import React, { Component } from "react";
import { connect } from "react-redux";

import { BUDGET, NEW_BUDGET, CATEGORY } from "Redux/ui/pages";
import Budget from "../budget/budget";
import NewBudgetPage from "../new-budget-page/new-budget-page";
import CategoryPage from "../category-page/category-page";
import { getAllBudgets as getAllBudgetsAction } from "Redux/budgets/actions";

const pages = {
  [BUDGET]: Budget,
  [NEW_BUDGET]: NewBudgetPage,
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
