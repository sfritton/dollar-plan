import React from "react"; // eslint-disable-line no-unused-vars
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Root from "./root";
import pageEnum from "../../util/page-enum";
import Budget from "../budget/budget";
import Welcome from "../welcome/welcome";

describe("root", function() {
  beforeEach(function() {
    this.budget = {
      date: { month: 10, year: 2017 },
      incomes: [],
      expenses: []
    };
  });

  it("renders without problems", function() {
    const root = TestUtils.renderIntoDocument(
      <Root page={pageEnum.WELCOME} budget={this.budget} />
    );
    expect(root).toBeTruthy();
  });

  it("renders exactly one budget page and nothing else", function() {
    testPage(pageEnum.BUDGET, Budget);
  });

  it("renders exactly one welcome page and nothing else", function() {
    testPage(pageEnum.WELCOME, Welcome);
  });

  it("renders exactly one 404 error page", function() {
    const root = TestUtils.renderIntoDocument(
      <Root page={"unknown route"} budget={this.budget} />
    );

    const header = TestUtils.findRenderedDOMComponentWithClass(
      root,
      "pg-header"
    );
    expect(header.textContent).toContain("Error 404");
  });

  it("renders no other page when an unknown route is passed in", function() {
    testPage("unknown route", null);
  });

  function testPage(input, expectedOutput) {
    const root = TestUtils.renderIntoDocument(
      <Root
        page={input}
        budget={{
          date: { month: 10, year: 2017 },
          incomes: [],
          expenses: []
        }}
      />
    );

    const pages = [Budget, Welcome];

    pages.forEach(page => {
      let pg = TestUtils.scryRenderedComponentsWithType(root, page);
      expect(pg.length).toEqual(page === expectedOutput ? 1 : 0);
    });
  }
});
