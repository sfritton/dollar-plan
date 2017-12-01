import React from "react";
import { Glyphicon } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Budget from "../budget/budget";
import Page from "../page/page";
import Welcome from "../welcome/welcome";
import DateService from "../../services/date-service";

("use strict");

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      budgets: this.props.fileService.getBudgets()
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
    const activeBudget = this.getActiveBudget(this.state, date);
    const budgetId = this.getActiveBudgetIndex(this.state, date);
    const budgetDates = this.props.fileService.getBudgetDates();

    return (
      <Budget
        budget={activeBudget}
        budgetDates={budgetDates}
        // income category methods
        updateIncomeCategoryTitle={(catId, title) =>
          this.updateIncomeCategoryTitle(budgetId, catId, title)}
        updateIncomeCategoryAmount={(catId, amount) =>
          this.updateIncomeCategoryAmount(budgetId, catId, amount)}
        addIncomeCategory={() => this.addIncomeCategory(budgetId)}
        deleteIncomeCategory={catId =>
          this.deleteIncomeCategory(budgetId, catId)}
        // expense category methods
        updateExpenseCategoryTitle={(catId, title) =>
          this.updateExpenseCategoryTitle(budgetId, catId, title)}
        addExpenseCategory={() => this.addExpenseCategory(budgetId)}
        deleteExpenseCategory={catId =>
          this.deleteExpenseCategory(budgetId, catId)}
        // expense sub-category methods
        updateExpenseSubCategoryTitle={(catId, subCatId, title) =>
          this.updateExpenseSubCategoryTitle(budgetId, catId, subCatId, title)}
        updateExpenseSubCategoryAmount={(catId, subCatId, amount) =>
          this.updateExpenseSubCategoryAmount(
            budgetId,
            catId,
            subCatId,
            amount
          )}
        addExpenseSubCategory={catId =>
          this.addExpenseSubCategory(budgetId, catId)}
        deleteExpenseSubCategory={(catId, subCatId) =>
          this.deleteExpenseSubCategory(budgetId, catId, subCatId)}
      />
    );
  }

  /****************************************************************************
   * Income Categories
   ****************************************************************************/
  updateIncomeCategoryTitle(budgetId, catId, title) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.incomes[catId].title = title;
    });
  }

  updateIncomeCategoryAmount(budgetId, catId, amount) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.incomes[catId].plannedAmount = amount;
    });
  }

  addIncomeCategory(budgetId) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.incomes.push({
        title: "",
        plannedAmount: 0,
        actualAmount: 0
      });
    });
  }

  deleteIncomeCategory(budgetId, catId) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.incomes = activeBudget.incomes.filter(
        (income, i) => i !== catId
      );
    });
  }

  /****************************************************************************
   * Expense Categories
   ****************************************************************************/
  updateExpenseCategoryTitle(budgetId, catId, title) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.expenses[catId].title = title;
    });
  }

  addExpenseCategory(budgetId) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.expenses.push({
        title: "",
        subCategories: [{ title: "", plannedAmount: 0, actualAmount: 0 }]
      });
    });
  }

  deleteExpenseCategory(budgetId, catId) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.expenses = activeBudget.expenses.filter(
        (expense, i) => i !== catId
      );
    });
  }

  /****************************************************************************
   * Expense Sub-Categories
   ****************************************************************************/
  updateExpenseSubCategoryTitle(budgetId, catId, subCatId, title) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.expenses[catId].subCategories[subCatId].title = title;
    });
  }

  updateExpenseSubCategoryAmount(budgetId, catId, subCatId, amount) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.expenses[catId].subCategories[
        subCatId
      ].plannedAmount = amount;
    });
  }

  addExpenseSubCategory(budgetId, catId) {
    this.updateActiveBudget(budgetId, activeBudget => {
      activeBudget.expenses[catId].subCategories.push({
        title: "",
        plannedAmount: 0,
        actualAmount: 0
      });
    });
  }

  deleteExpenseSubCategory(budgetId, catId, subcatId) {
    this.updateActiveBudget(budgetId, activeBudget => {
      const category = activeBudget.expenses[catId];
      category.subCategories = category.subCategories.filter((subCat, i) => {
        return i != subcatId;
      });

      // if a category has no sub-categories, remove it
      if (category.subCategories.length < 1) {
        activeBudget.splice(catId, 1);
      } else {
        activeBudget.expenses[catId] = category;
      }
    });
  }

  /****************************************************************************
   * Util
   ****************************************************************************/
  getActiveBudget(state, date) {
    const { month, year } = DateService.decodeDate(date);
    return state.budgets.find(
      budget => budget.date.year === year && budget.date.month === month
    );
  }

  getActiveBudgetIndex(state, date) {
    const { month, year } = DateService.decodeDate(date);
    return state.budgets.findIndex(
      budget => budget.date.year === year && budget.date.month === month
    );
  }

  updateActiveBudget(budgetId, updateFunction) {
    this.setState(prevState => {
      const budgets = prevState.budgets;
      const activeBudget = budgets[budgetId];

      updateFunction(activeBudget);

      budgets[budgetId] = activeBudget;

      return { budgets };
    });
  }
}

export default Root;
