import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Root from "./root";

describe("root", function() {
  beforeEach(function() {
    this.budget = {
      date: { month: 10, year: 2017 },
      incomes: [],
      expenses: []
    };
  });

  it("renders without problems", function() {
    const root = TestUtils.renderIntoDocument(<Root />);
    expect(root).toBeTruthy();
  });
});
