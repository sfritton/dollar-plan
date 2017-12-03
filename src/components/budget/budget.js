import React from "react";
import { Glyphicon } from "react-bootstrap";

import Page from "../page/page";
import SubCategory from "../sub-category/sub-category";
import Category from "../category/category";
import CategoryButton from "../util/category-button";
import BudgetHeader from "./budget-header/budget-header";
import BudgetFooter from "./budget-footer/budget-footer";

export default class Budget extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      edit: false
    };
  }
  render() {
    return (
      <Page
        header={
          <BudgetHeader
            budgetDates={this.props.budgetDates || []}
            date={this.props.budget.date}
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
        {this.props.budget.incomes.map((income, i) => (
          <SubCategory
            key={i}
            title={income.title}
            updateTitle={title =>
              this.props.updateIncomeCategoryTitle(i, title)}
            income
            edit={this.state.edit}
            plannedAmount={income.plannedAmount}
            updateAmount={amount =>
              this.props.updateIncomeCategoryAmount(i, amount)}
            actualAmount={income.actualAmount}
            deleteSubCategory={() => this.props.deleteIncomeCategory(i)}
          />
        ))}
        {this.state.edit ? (
          <CategoryButton
            subCategory
            onClick={() => this.props.addIncomeCategory()}
          >
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
        <div className="section-header">Expenses</div>
        {this.props.budget.expenses.map((expense, i) => (
          <Category
            key={i}
            title={expense.title}
            edit={this.state.edit}
            defaultOpen
            subCategories={expense.subCategories}
            deleteCategory={() => this.props.deleteExpenseCategory(i)}
            updateTitle={title =>
              this.props.updateExpenseCategoryTitle(i, title)}
            updateSubCategoryTitle={(subCatId, title) =>
              this.props.updateExpenseSubCategoryTitle(i, subCatId, title)}
            updateSubCategoryAmount={(subCatId, amount) =>
              this.props.updateExpenseSubCategoryAmount(i, subCatId, amount)}
            addSubCategory={() => this.props.addExpenseSubCategory(i)}
            deleteSubCategory={subCatId =>
              this.props.deleteExpenseSubCategory(i, subCatId)}
          />
        ))}
        {this.state.edit ? (
          <CategoryButton onClick={() => this.props.addExpenseCategory()}>
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
      </Page>
    );
  }
  getIncome() {
    return this.props.budget.incomes.reduce((sum, income) => {
      return sum + income.actualAmount;
    }, 0);
  }
  getExpenses() {
    return this.props.budget.expenses.reduce((sum, expense) => {
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
}
