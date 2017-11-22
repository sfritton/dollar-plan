import React from "react";
import { Glyphicon } from "react-bootstrap";

import Page from "../page/page";
import SubCategory from "../sub-category/sub-category";
import Category from "../category/category";
import CategoryButton from "../util/category-button";
import BudgetHeader from "./budget-header/budget-header";
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
  }
  render() {
    return (
      <Page
        header={
          <BudgetHeader
            otherBudgets={this.props.otherBudgets || []}
            month={this.props.date.month}
            year={this.props.date.year}
          />
        }
        footer={
          <BudgetFooter
            balance={this.getIncome() - this.getExpenses()}
            edit={this.state.edit}
            adjust={() => this.toggleEdit()}
            save={() => this.toggleEdit()}
          />
        }
      >
        <div className="section-header">Income</div>
        {this.state.incomes.map((income, i) => (
          <SubCategory
            key={i}
            id={i}
            title={income.title}
            updateTitle={(id, title) =>
              this.updateIncomeCategoryTitle(id, title)}
            income
            edit={this.state.edit}
            plannedAmount={income.plannedAmount}
            updateAmount={(id, amount) =>
              this.updateIncomeCategoryAmount(id, amount)}
            actualAmount={income.actualAmount}
            deleteSubCategory={id => this.deleteIncomeCategory(id)}
          />
        ))}
        {this.state.edit ? (
          <CategoryButton subCategory onClick={() => this.addIncomeCategory()}>
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
        <div className="section-header">Expenses</div>
        {this.state.expenses.map((expense, i) => (
          <Category
            key={i}
            id={i}
            title={expense.title}
            edit={this.state.edit}
            defaultOpen
            subCategories={expense.subCategories}
            deleteCategory={id => this.deleteExpenseCategory(id)}
            updateTitle={(id, title) =>
              this.updateExpenseCategoryTitle(id, title)}
            updateSubCategoryTitle={(catId, subCatId, title) =>
              this.updateExpenseSubCategoryTitle(catId, subCatId, title)}
            updateSubCategoryAmount={(catId, subCatId, amount) =>
              this.updateExpenseSubCategoryAmount(catId, subCatId, amount)}
            addSubCategory={catId => this.addExpenseSubCategory(catId)}
            deleteSubCategory={(catId, subCatId) =>
              this.deleteExpenseSubCategory(catId, subCatId)}
          />
        ))}
        {this.state.edit ? (
          <CategoryButton onClick={() => this.addExpenseCategory()}>
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
      </Page>
    );
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
  addIncomeCategory() {
    this.setState(prevState => {
      prevState.incomes.push({ title: "", plannedAmount: 0, actualAmount: 0 });
      return {
        incomes: prevState.incomes
      };
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
  addExpenseCategory() {
    this.setState(prevState => {
      prevState.expenses.push({
        title: "",
        subCategories: [{ title: "", plannedAmount: 0, actualAmount: 0 }]
      });
      return {
        expenses: prevState.expenses
      };
    });
  }
  deleteExpenseCategory(id) {
    this.setState(prevState => ({
      expenses: prevState.expenses.filter((expense, i) => {
        return i !== id;
      })
    }));
  }
  addExpenseSubCategory(catId) {
    this.setState(prevState => {
      prevState.expenses[catId].subCategories.push({
        title: "",
        plannedAmount: 0,
        actualAmount: 0
      });
      return {
        expenses: prevState.expenses
      };
    });
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
