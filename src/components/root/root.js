import React from "react";

import Pages from "../../constants/pages-enum";
import BudgetContainer from "../budget/budget-container";
import WelcomeContainer from "../welcome/welcome-container";
import CategoryPage from "../category-page/category-page";
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
        return (
          <CategoryPage
            month={10}
            year={2017}
            category={{
              title: "Interest",
              plannedAmount: 100,
              transactions: [
                { date: "", description: "TCU Checking", amount: 25 },
                { date: "", description: "House Fund", amount: 20 },
                { date: "", description: "Discover Savings", amount: 45 },
                { date: "", description: "Baby Fund", amount: 10 }
              ]
            }}
          />
        );
      default:
        return <BudgetContainer />;
    }
  }
}
