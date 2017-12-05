import React from "react";
import { Glyphicon } from "react-bootstrap";

import * as BudgetActions from "../../actions/budget-actions";
import * as UIActions from "../../actions/ui-actions";
import Pages from "../../constants/pages-enum";
import Page from "../page/page";
import SubCategory from "../sub-category/sub-category";
import Category from "../category/category";
import CategoryButton from "../util/category-button";
import BudgetHeader from "./budget-header/budget-header";
import BudgetFooter from "./budget-footer/budget-footer";

export default class Budget extends React.Component {
  render() {
    return (
      <Page
        header={
          <BudgetHeader
            budgetDates={this.props.budgetDates || []}
            date={this.props.budget.date}
            setActiveBudget={(month, year) =>
              this.props.dispatch(BudgetActions.setActiveBudget(month, year))}
            createNewBudget={() =>
              this.props.dispatch(UIActions.setPage(Pages.WELCOME))}
          />
        }
        footer={
          <BudgetFooter
            balance={this.getIncome() - this.getExpenses()}
            edit={this.props.edit}
            adjust={() => this.props.dispatch(UIActions.setEdit(true))}
            save={() => this.props.dispatch(UIActions.setEdit(false))}
          />
        }
      >
        <div className="section-header">Income</div>
        {this.props.budget.incomes.map((income, i) => (
          <SubCategory
            key={i}
            title={income.title}
            updateTitle={title =>
              this.props.dispatch(
                BudgetActions.updateIncomeCategoryTitle(i, title)
              )}
            income
            edit={this.props.edit}
            plannedAmount={income.plannedAmount}
            updateAmount={amount =>
              this.props.dispatch(
                BudgetActions.updateIncomeCategoryAmount(i, amount)
              )}
            actualAmount={income.actualAmount}
            deleteSubCategory={() =>
              this.props.dispatch(BudgetActions.deleteIncomeCategory(i))}
          />
        ))}
        {this.props.edit ? (
          <CategoryButton
            subCategory
            onClick={() =>
              this.props.dispatch(BudgetActions.addIncomeCategory())}
          >
            <Glyphicon glyph="plus" /> Add a category
          </CategoryButton>
        ) : null}
        <div className="section-header">Expenses</div>
        {this.props.budget.expenses.map((expense, i) => (
          <Category
            key={i}
            title={expense.title}
            edit={this.props.edit}
            defaultOpen
            subCategories={expense.subCategories}
            deleteCategory={() =>
              this.props.dispatch(BudgetActions.deleteExpenseCategory(i))}
            updateTitle={title =>
              this.props.dispatch(
                BudgetActions.updateExpenseCategoryTitle(i, title)
              )}
            updateSubCategoryTitle={(subCatId, title) =>
              this.props.dispatch(
                BudgetActions.updateExpenseSubCategoryTitle(i, subCatId, title)
              )}
            updateSubCategoryAmount={(subCatId, amount) =>
              this.props.dispatch(
                BudgetActions.updateExpenseSubCategoryAmount(
                  i,
                  subCatId,
                  amount
                )
              )}
            addSubCategory={() =>
              this.props.dispatch(BudgetActions.addExpenseSubCategory(i))}
            deleteSubCategory={subCatId =>
              this.props.dispatch(
                BudgetActions.deleteExpenseSubCategory(i, subCatId)
              )}
          />
        ))}
        {this.props.edit ? (
          <CategoryButton
            onClick={() =>
              this.props.dispatch(BudgetActions.addExpenseCategory())}
          >
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
}
