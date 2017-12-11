import React from "react";

import Pages from "../../constants/pages-enum";
import BudgetContainer from "../budget/budget-container";
import WelcomeContainer from "../welcome/welcome-container";
import CategoryPageContainer from "../category-page/category-page-container";
import { getAllBudgets, setActiveBudget } from "../../actions/budget-actions";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(getAllBudgets());
    props.dispatch(setActiveBudget(10, 2017)); // TODO: load first budget
  }

  render() {
    switch (this.props.page) {
      case Pages.WELCOME:
        return <WelcomeContainer />;
      case Pages.BUDGET:
        return <BudgetContainer />;
      case Pages.CATEGORY:
        return <CategoryPageContainer />;
      default:
        return <BudgetContainer />;
    }
  }
}
