import React from "react"; // eslint-disable-line no-unused-vars
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Budget from "./budget";
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
    this.budget = TestUtils.renderIntoDocument(
      <Budget
        date={this.date}
        incomes={this.incomes}
        expenses={this.expenses}
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

  it("renders exactly 2 section headers", function() {
    const headers = TestUtils.scryRenderedDOMComponentsWithClass(
      this.budget,
      "section-header"
    );
    expect(headers.length).toEqual(2);
  });

  it("renders the correct year", function() {
    const header = TestUtils.findRenderedDOMComponentWithClass(
      this.budget,
      "pg-header"
    );
    expect(header.textContent).toContain(this.date.year);
  });

  it("returns the correct month in all cases", function() {
    const months = [
      { input: 1, expectedMonth: "January" },
      { input: 2, expectedMonth: "February" },
      { input: 3, expectedMonth: "March" },
      { input: 4, expectedMonth: "April" },
      { input: 5, expectedMonth: "May" },
      { input: 6, expectedMonth: "June" },
      { input: 7, expectedMonth: "July" },
      { input: 8, expectedMonth: "August" },
      { input: 9, expectedMonth: "September" },
      { input: 10, expectedMonth: "October" },
      { input: 11, expectedMonth: "November" },
      { input: 12, expectedMonth: "December" },
      { input: -1, expectedMonth: "Frittembruary" },
      { input: 13, expectedMonth: "Frittembruary" }
    ];
    months.map(month => {
      let b = TestUtils.renderIntoDocument(
        <Budget
          date={{ month: month.input, year: 2017 }}
          incomes={[]}
          expenses={[]}
        />
      );
      let header = TestUtils.findRenderedDOMComponentWithClass(b, "pg-header");
      expect(header.textContent).toContain(month.expectedMonth);
    });
  });

  it("renders the balance", function() {
    const footers = TestUtils.scryRenderedDOMComponentsWithClass(
      this.budget,
      "pg-footer"
    );

    expect(footers.length).toEqual(1);
    expect(footers[0].textContent).toContain("Balance:");
  });

  it("renders a negative balance correctly", function() {
    const bgt = TestUtils.renderIntoDocument(
      <Budget
        date={{ month: 10, year: 2017 }}
        incomes={[{ title: "Work", plannedAmount: 100, actualAmount: 0 }]}
        expenses={[
          {
            title: "Apartment",
            subCategories: [
              { title: "Rent", plannedAmount: 200, actualAmount: 150 }
            ]
          }
        ]}
      />
    );

    const balance = TestUtils.findRenderedDOMComponentWithClass(
      bgt,
      "pg-footer"
    );
    expect(balance.textContent).toContain("-$150");
  });

  it("renders a positive balance correctly", function() {
    const bgt = TestUtils.renderIntoDocument(
      <Budget
        date={{ month: 10, year: 2017 }}
        incomes={[{ title: "Work", plannedAmount: 100, actualAmount: 150 }]}
        expenses={[
          {
            title: "Apartment",
            subCategories: [
              { title: "Rent", plannedAmount: 200, actualAmount: 0 }
            ]
          }
        ]}
      />
    );

    const balance = TestUtils.findRenderedDOMComponentWithClass(
      bgt,
      "pg-footer"
    );
    expect(balance.textContent).toContain("$150");
  });
});
