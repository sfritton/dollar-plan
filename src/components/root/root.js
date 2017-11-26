import React from "react";
import { Glyphicon } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Budget from "../budget/budget";
import Page from "../page/page";
import Welcome from "../welcome/welcome";
import FileService from "../../services/file-service";

("use strict");

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBudget: {
        date: { month: 10, year: 2017 },
        incomes: [],
        expenses: []
      }
    };
  }

  /****************************************************************************
   * Rendering
   ****************************************************************************/
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/welcome">Welcome</Link>
            {" - "}
            <Link to="/budget/2017-10">October 2017</Link>
            {" - "}
            <Link to="/budget/2017-11">November 2017</Link>
            {" - "}
            <Link to="/budget/2017-11/category/Groceries">
              Groceries Nov 2017
            </Link>
          </nav>
          <div>
            <Route path="/welcome" component={Welcome} />
            <Route
              path="/budget/:date/category/:name"
              render={({ match }) =>
                this.renderCategoryPage(match.params.date, match.params.name)}
            />
            <Route
              path="/budget/:date"
              render={({ match }) => this.renderBudgetPage(match.params.date)}
            />
          </div>
        </div>
      </Router>
    );
  }

  renderCategoryPage(date, name) {
    return (
      <Page header={"Under Construction"}>
        {`Category: ${name},\nBudget: ${date}.\n\nCome back soon!`}
      </Page>
    );
  }

  renderBudgetPage(date) {
    const budgetDates = FileService.readBudgetList();

    return (
      <Budget
        budget={this.state.activeBudget}
        budgetDates={budgetDates}
        // income category methods
        updateIncomeCategoryTitle={(id, title) =>
          this.updateIncomeCategoryTitle(id, title)}
        updateIncomeCategoryAmount={(id, amount) =>
          this.updateIncomeCategoryTitle(id, amount)}
        addIncomeCategory={() => this.addIncomeCategory()}
        deleteIncomeCategory={id => this.deleteIncomeCategory(id)}
        // expense category methods
        updateExpenseCategoryTitle={(id, title) =>
          this.updateExpenseCategoryTitle(id, title)}
        addExpenseCategory={() => this.addExpenseCategory()}
        deleteExpenseCategory={id => this.deleteExpenseCategory(id)}
        // expense sub-category methods
        updateExpenseSubCategoryTitle={(catId, subCatId, title) =>
          this.updateExpenseSubCategoryTitle(catId, subCatId, title)}
        updateExpenseSubCategoryAmount={(catId, subCatId, amount) =>
          this.updateExpenseSubCategoryTitle(catId, subCatId, amount)}
        addExpenseSubCategory={catId => this.addExpenseSubCategory(catId)}
        deleteExpenseSubCategory={(catId, subCatId) =>
          this.deleteExpenseSubCategory(catId, subCatId)}
      />
    );
  }

  componentWillMount() {
    // this.setState({
    //   activeBudget: FileService.readBudgetFromFile(date)
    // });
    console.log(this);
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("here: " + this.props.location);
    console.log("going to: " + nextProps.location);
    if (nextProps.location !== this.props.location) {
      // navigated!
    }
  }

  /****************************************************************************
   * Income Categories
   ****************************************************************************/
  updateIncomeCategoryTitle(id, title) {
    this.setState(prevState => {
      const activeBudget = prevState.activeBudget;
      activeBudget.incomes[id].title = title;

      return { activeBudget };
    });
  }

  updateIncomeCategoryAmount(id, amount) {
    this.setState(prevState => {
      prevState.activeBudget.incomes[id].plannedAmount = amount;

      return { incomes: prevState.activeBudget.incomes };
    });
  }

  addIncomeCategory() {
    this.setState(prevState => {
      prevState.activeBudget.incomes.push({
        title: "",
        plannedAmount: 0,
        actualAmount: 0
      });
      return {
        incomes: prevState.activeBudget.incomes
      };
    });
  }

  deleteIncomeCategory(id) {
    this.setState(prevState => ({
      incomes: prevState.activeBudget.incomes.filter((income, i) => {
        return i !== id;
      })
    }));
  }

  /****************************************************************************
   * Expense Categories
   ****************************************************************************/
  updateExpenseCategoryTitle(id, title) {
    this.setState(prevState => {
      prevState.activeBudget.expenses[id].title = title;

      return { expenses: prevState.activeBudget.expenses };
    });
  }

  addExpenseCategory() {
    this.setState(prevState => {
      prevState.activeBudget.expenses.push({
        title: "",
        subCategories: [{ title: "", plannedAmount: 0, actualAmount: 0 }]
      });
      return {
        expenses: prevState.activeBudget.expenses
      };
    });
  }

  deleteExpenseCategory(id) {
    this.setState(prevState => ({
      expenses: prevState.activeBudget.expenses.filter((expense, i) => {
        return i !== id;
      })
    }));
  }

  /****************************************************************************
   * Expense Sub-Categories
   ****************************************************************************/
  updateExpenseSubCategoryTitle(catId, subCatId, title) {
    this.setState(prevState => {
      prevState.activeBudget.expenses[catId].subCategories[
        subCatId
      ].title = title;

      return { expenses: prevState.activeBudget.expenses };
    });
  }

  updateExpenseSubCategoryAmount(catId, subCatId, amount) {
    this.setState(prevState => {
      prevState.activeBudget.expenses[catId].subCategories[
        subCatId
      ].plannedAmount = amount;

      return { expenses: prevState.activeBudget.expenses };
    });
  }

  addExpenseSubCategory(catId) {
    this.setState(prevState => {
      prevState.activeBudget.expenses[catId].subCategories.push({
        title: "",
        plannedAmount: 0,
        actualAmount: 0
      });
      return {
        expenses: prevState.activeBudget.expenses
      };
    });
  }

  deleteExpenseSubCategory(catId, subcatId) {
    this.setState(prevState => {
      let category = prevState.activeBudget.expenses[catId];
      category.subCategories = category.subCategories.filter((subCat, i) => {
        return i != subcatId;
      });

      // if a category has no sub-categories, remove it
      if (category.subCategories.length < 1) {
        prevState.activeBudget.splice(catId, 1);
      } else {
        prevState.activeBudget.expenses[catId] = category;
      }

      return {
        expenses: prevState.activeBudget.expenses
      };
    });
  }
}

export default Root;
