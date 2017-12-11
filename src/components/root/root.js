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
                {
                  date: "Tue Oct 31 2017",
                  description: "TCU Checking",
                  amount: 25
                },
                {
                  date: "Mon Oct 30 2017",
                  description: "House Fund",
                  amount: 20
                },
                {
                  date: "Sun Oct 29 2017",
                  description: "Discover Savings",
                  amount: 45
                },
                {
                  date: "Fri Oct 27 2017",
                  description: "Baby Fund",
                  amount: 10
                }
              ]
            }}
          />
        );
      default:
        return <BudgetContainer />;
    }
  }
}
