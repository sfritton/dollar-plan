import React, { Component } from "react";
import { connect } from "react-redux";

import Pages from "Redux/actions/pages-enum";
import Budget from "../budget/budget";
import Welcome from "../welcome/welcome";
import CategoryPage from "../category-page/category-page";
import { getAllBudgets, setActiveBudget } from "Redux/actions/budget-actions";

class Root extends Component {
  constructor(props) {
    super(props);
    props.dispatch(getAllBudgets());
  }

  render() {
    switch (this.props.page) {
      case Pages.WELCOME:
        return <Welcome />;
      case Pages.BUDGET:
        return <Budget />;
      case Pages.CATEGORY:
        return <CategoryPage />;
      default:
        return <Budget />;
    }
  }
}

const mapStateToProps = state => ({
  page: state.ui.page
});

export default connect(mapStateToProps)(Root);
