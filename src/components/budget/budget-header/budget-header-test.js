import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import BudgetHeader from "./budget-header";

describe("BudgetHeader", function() {
  beforeEach(function() {
    this.budgetHeader = TestUtils.renderIntoDocument(
      <BudgetHeader month={10} year={2015} otherBudgets={[]} />
    );
  });
  it("renders without problems", function() {
    expect(this.budgetHeader).toBeTruthy();
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
    months.forEach(month =>
      expect(this.budgetHeader.getMonthName(month.input)).toContain(
        month.expectedMonth
      )
    );
  });
});
