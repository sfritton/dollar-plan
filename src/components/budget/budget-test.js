import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Budget from "./budget";
import BudgetFooter from "./budget-footer/budget-footer";
import BudgetHeader from "./budget-header/budget-header";
import Category from "../category/category";
import SubCategory from "../sub-category/sub-category";
import Page from "../page/page";

describe("Budget", function() {
  beforeEach(function() {
    this.date = {
      month: 10,
      year: 2017
    };
    this.incomes = [
      { title: "Sam", plannedAmount: 6000, actualAmount: 3000 },
      { title: "Ellen", plannedAmount: 700, actualAmount: 900 }
    ];
    this.expenses = [
      {
        title: "Investments & Savings",
        subCategories: [
          { title: "Donations", plannedAmount: 100, actualAmount: 0 },
          { title: "Roth IRA", plannedAmount: 600, actualAmount: 0 }
        ]
      },
      {
        title: "Apartment",
        subCategories: [
          { title: "Rent & Water", plannedAmount: 1320, actualAmount: 1320 },
          { title: "Electric", plannedAmount: 49, actualAmount: 49 }
        ]
      }
    ];
    this.mockFileService = {
      readBudgetFromFile: (month, year) => ({
        incomes: this.incomes,
        expenses: this.expenses
      }),
      readBudgetList: () => []
    };
    this.budget = TestUtils.renderIntoDocument(
      <Budget
        fileService={this.mockFileService}
        date={this.date}
      />
    );
  });

  it("renders without problems", function() {
    expect(this.budget).toBeTruthy();
  });

  it("renders exactly 2 Category components", function() {
    const categories = TestUtils.scryRenderedComponentsWithType(
      this.budget,
      Category
    );
    expect(categories.length).toEqual(2);
  });

  it("renders exactly 6 SubCategory components", function() {
    const subCats = TestUtils.scryRenderedComponentsWithType(
      this.budget,
      SubCategory
    );
    expect(subCats.length).toEqual(6);
  });

  it("renders exactly 1 Page component", function() {
    const pages = TestUtils.scryRenderedComponentsWithType(this.budget, Page);
    expect(pages.length).toEqual(1);
  });

  it("renders exactly 1 BudgetFooter component", function() {
    const footers = TestUtils.scryRenderedComponentsWithType(
      this.budget,
      BudgetFooter
    );
    expect(footers.length).toEqual(1);
  });

  it("renders exactly 1 BudgetHeader component", function() {
    const headers = TestUtils.scryRenderedComponentsWithType(
      this.budget,
      BudgetHeader
    );
    expect(headers.length).toEqual(1);
  });

  it("renders exactly 2 section headers", function() {
    const headers = TestUtils.scryRenderedDOMComponentsWithClass(
      this.budget,
      "section-header"
    );
    expect(headers.length).toEqual(2);
  });
});
