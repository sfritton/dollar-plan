import React from "react";

import Page from "../page/page";
import SubCategory from "../sub-category/sub-category";
import Category from "../category/category";
import BudgetFooter from "./budget-footer/budget-footer";

("use strict");

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      incomes: props.incomes,
      expenses: props.expenses
    };

    this.toggleEdit = this.toggleEdit.bind(this);

    this.updateIncomeCategoryTitle = this.updateIncomeCategoryTitle.bind(this);
    this.updateIncomeCategoryAmount = this.updateIncomeCategoryAmount.bind(
      this
    );
    this.deleteIncomeCategory = this.deleteIncomeCategory.bind(this);

    this.updateExpenseCategoryTitle = this.updateExpenseCategoryTitle.bind(
      this
    );
    this.updateExpenseSubCategoryTitle = this.updateExpenseSubCategoryTitle.bind(
      this
    );
    this.updateExpenseSubCategoryAmount = this.updateExpenseSubCategoryAmount.bind(
      this
    );
    this.deleteExpenseCategory = this.deleteExpenseCategory.bind(this);
    this.deleteExpenseSubCategory = this.deleteExpenseSubCategory.bind(this);
  }
  render() {
    return (
      <Page
        header={`${this.getMonthName()} ${this.props.date.year}`}
        footer={
          <BudgetFooter
            balance={this.getIncome() - this.getExpenses()}
            edit={this.state.edit}
            adjust={this.toggleEdit}
            save={this.toggleEdit}
          />
        }
      >
        <div className="section-header">Income</div>
        {this.state.incomes.map((income, i) => (
          <SubCategory
            key={i}
            id={i}
            title={income.title}
            updateTitle={this.updateIncomeCategoryTitle}
            income
            edit={this.state.edit}
            plannedAmount={income.plannedAmount}
            updateAmount={this.updateIncomeCategoryAmount}
            actualAmount={income.actualAmount}
            deleteSubCategory={this.deleteIncomeCategory}
          />
        ))}
        <div className="section-header">Expenses</div>
        {this.state.expenses.map((expense, i) => (
          <Category
            key={i}
            id={i}
            title={expense.title}
            edit={this.state.edit}
            defaultOpen
            subCategories={expense.subCategories}
            deleteCategory={this.deleteExpenseCategory}
            updateTitle={this.updateExpenseCategoryTitle}
            updateSubCategoryTitle={this.updateExpenseSubCategoryTitle}
            updateSubCategoryAmount={this.updateExpenseSubCategoryAmount}
            deleteSubCategory={this.deleteExpenseSubCategory}
          />
        ))}
      </Page>
    );
  }
  getMonthName() {
    switch (this.props.date.month) {
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
  toggleEdit() {
    this.setState(prevState => ({ edit: !prevState.edit }));
  }
  updateIncomeCategoryTitle(id, title) {
    this.setState(prevState => {
      prevState.incomes[id].title = title;

      return { incomes: prevState.incomes };
    });
  }
  updateIncomeCategoryAmount(id, amount) {
    this.setState(prevState => {
      prevState.incomes[id].plannedAmount = amount;

      return { incomes: prevState.incomes };
    });
  }
  deleteIncomeCategory(id) {
    this.setState(prevState => ({
      incomes: prevState.incomes.filter((income, i) => {
        return i !== id;
      })
    }));
  }
  updateExpenseCategoryTitle(id, title) {
    this.setState(prevState => {
      prevState.expenses[id].title = title;

      return { expenses: prevState.expenses };
    });
  }
  updateExpenseSubCategoryTitle(catId, subCatId, title) {
    this.setState(prevState => {
      prevState.expenses[catId].subCategories[subCatId].title = title;

      return { expenses: prevState.expenses };
    });
  }
  updateExpenseSubCategoryAmount(catId, subCatId, amount) {
    this.setState(prevState => {
      prevState.expenses[catId].subCategories[subCatId].plannedAmount = amount;

      return { expenses: prevState.expenses };
    });
  }
  deleteExpenseCategory(id) {
    this.setState(prevState => ({
      expenses: prevState.expenses.filter((expense, i) => {
        return i !== id;
      })
    }));
  }
  deleteExpenseSubCategory(catId, subcatId) {
    this.setState(prevState => {
      let category = prevState.expenses[catId];
      category.subCategories = category.subCategories.filter((subCat, i) => {
        return i != subcatId;
      });

      // if a category has no sub-categories, remove it
      if (category.subCategories.length < 1) {
        prevState.splice(catId, 1);
      } else {
        prevState.expenses[catId] = category;
      }

      return {
        expenses: prevState.expenses
      };
    });
  }
}

export default Budget;
