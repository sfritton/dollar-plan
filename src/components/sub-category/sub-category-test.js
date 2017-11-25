import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";
import { Glyphicon } from "react-bootstrap";

import SubCategory from "./sub-category";
import ProgressBar from "../util/progress-bar";
import TextInput from "../util/text-input";

describe("SubCategory", function() {
  beforeEach(function() {
    this.title = "Groceries";
    this.plannedAmount = 230;
    this.actualAmount = 100;
    this.category = TestUtils.renderIntoDocument(
      <SubCategory
        title={this.title}
        plannedAmount={this.plannedAmount}
        actualAmount={this.actualAmount}
      />
    );
  });

  it("renders without problems", function() {
    expect(this.category).toBeTruthy();
  });

  it("renders exactly 1 sub-category-title", function() {
    const titles = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "sub-category-title"
    );
    expect(titles.length).toEqual(1);
    expect(titles[0].textContent).toEqual(this.title);
  });

  it("renders exactly 1 sub-category-amount", function() {
    const amounts = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "sub-category-amount"
    );
    expect(amounts.length).toEqual(1);
    expect(amounts[0].textContent).toContain(this.plannedAmount);
    expect(amounts[0].textContent).toContain(this.actualAmount);
  });

  it("renders exactly 1 ProgressBar component", function() {
    const bars = TestUtils.scryRenderedComponentsWithType(
      this.category,
      ProgressBar
    );
    expect(bars.length).toEqual(1);
  });

  it("renders exactly 1 sub-category-message", function() {
    const messages = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "sub-category-message"
    );
    expect(messages.length).toEqual(1);
  });

  it("renders exactly 2 TextInput components in edit mode", function() {
    const category = TestUtils.renderIntoDocument(<SubCategory edit />);
    const inputs = TestUtils.scryRenderedComponentsWithType(
      category,
      TextInput
    );
    expect(inputs.length).toEqual(2);
  });

  it("renders exactly 1 Glyphicon component in edit mode", function() {
    const category = TestUtils.renderIntoDocument(<SubCategory edit />);
    const icons = TestUtils.scryRenderedComponentsWithType(category, Glyphicon);
    expect(icons.length).toEqual(1);
  });

  it("renders exactly 1 sub-category-message in edit mode", function() {
    const category = TestUtils.renderIntoDocument(<SubCategory edit />);
    const messages = TestUtils.scryRenderedDOMComponentsWithClass(
      category,
      "sub-category-message"
    );
    expect(messages.length).toEqual(1);
  });

  it("renders the correct message when actual expense < planned expense", function() {
    const plannedAmount = 230;
    const actualAmount = 100;
    testMessage(
      plannedAmount,
      actualAmount,
      false,
      false,
      `$${plannedAmount - actualAmount} left`
    );
  });

  it("renders the correct message when actual expense > planned expense", function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    testMessage(
      plannedAmount,
      actualAmount,
      false,
      false,
      `$${actualAmount - plannedAmount} over`
    );
  });

  it("renders the correct message when actual income < planned income", function() {
    const plannedAmount = 230;
    const actualAmount = 100;
    testMessage(
      plannedAmount,
      actualAmount,
      true,
      false,
      `$${plannedAmount - actualAmount} to go`
    );
  });

  it("renders the correct message when actual income > planned income", function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    testMessage(
      plannedAmount,
      actualAmount,
      true,
      false,
      `$${actualAmount - plannedAmount} extra`
    );
  });
});

function testMessage(plannedAmount, actualAmount, income, edit, msg) {
  let category = TestUtils.renderIntoDocument(
    <SubCategory
      title={"Title"}
      income={income}
      edit={edit}
      plannedAmount={plannedAmount}
      actualAmount={actualAmount}
    />
  );
  let message = TestUtils.findRenderedDOMComponentWithClass(
    category,
    "sub-category-message"
  ).textContent;
  expect(message).toEqual(msg);
}
