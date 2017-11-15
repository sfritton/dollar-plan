import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import BudgetHeader from "./budget-header";

describe("BudgetHeader", function() {
  it("renders without problems", function() {
    const budgetHeader = TestUtils.renderIntoDocument(
      <BudgetHeader month={10} year={2015} />
    );
    expect(budgetHeader).toBeTruthy();
  });

  it("renders the correct year", function() {
    const year = 2022;
    const budgetHeader = TestUtils.renderIntoDocument(
      <BudgetHeader month={10} year={year} />
    );
    const header = TestUtils.findRenderedDOMComponentWithTag(
      budgetHeader,
      "div"
    );
    expect(header.textContent).toContain(year);
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
        <BudgetHeader month={month.input} year={2017} />
      );
      let header = TestUtils.findRenderedDOMComponentWithTag(b, "div");
      expect(header.textContent).toContain(month.expectedMonth);
    });
  });
});
