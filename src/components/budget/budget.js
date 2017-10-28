import React from "react";
import * as fs from "fs";

import Page from "../page/page";
import SubCategory from "../sub-category/sub-category";
import Category from "../category/category";
import BudgetFooter from "./budget-footer/budget-footer";

("use strict");

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(
      fs.readFileSync(`data\\${props.match.params.date}.json`)
    );
    console.log(this.state);
  }
  getMonthName() {
    switch (this.state.date.month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Frittembruary";
    }
  }
  getIncome() {
    return this.state.incomes.reduce((sum, income) => {
      return sum + income.actualAmount;
    }, 0);
  }
  getExpenses() {
    return this.state.expenses.reduce((sum, expense) => {
      return (
        sum +
        expense.subCategories.reduce((sum, subCat) => {
          return sum + subCat.actualAmount;
        }, 0)
      );
    }, 0);
  }
  render() {
    return (
      <Page
        header={`${this.getMonthName()} ${this.state.date.year}`}
        footer={
          <BudgetFooter balance={this.getIncome() - this.getExpenses()} />
        }
      >
        <div className="section-header">Income</div>
        {this.state.incomes.map((income, i) => (
          <SubCategory
            key={i}
            title={income.title}
            income={true}
            plannedAmount={income.plannedAmount}
            actualAmount={income.actualAmount}
          />
        ))}
        <div className="section-header">Expenses</div>
        {this.state.expenses.map((expense, i) => (
          <Category
            key={i}
            title={expense.title}
            income={false}
            defaultOpen={true}
            subCategories={expense.subCategories}
          />
        ))}
      </Page>
    );
  }
}

export default Budget;
