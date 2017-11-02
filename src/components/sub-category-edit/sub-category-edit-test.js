import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";
import { FormControl } from "react-bootstrap";

import SubCategoryEdit from "./sub-category-edit";

describe("SubCategoryEdit", function() {
  beforeEach(function() {
    this.title = "Groceries";
    this.plannedAmount = 230;
    this.actualAmount = 100;
    this.category = TestUtils.renderIntoDocument(<SubCategoryEdit />);
  });

  it("renders without problems", function() {
    expect(this.category).toBeTruthy();
  });

  it("renders exactly 2 FormControl components", function() {
    const controls = TestUtils.scryRenderedComponentsWithType(
      this.category,
      FormControl
    );
    expect(controls.length).toEqual(2);
  });

  it("renders exactly 1 sub-category-message", function() {
    const messages = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "sub-category-message"
    );
    expect(messages.length).toEqual(1);
  });

  it("renders the correct message when actual income is passed in", function() {
    let category = TestUtils.renderIntoDocument(
      <SubCategoryEdit income={true} actualAmount={this.actualAmount} />
    );
    let message = TestUtils.findRenderedDOMComponentWithClass(
      category,
      "sub-category-message"
    ).textContent;
    expect(message).toEqual("$" + this.actualAmount + " earned so far");
  });

  it("renders the correct message when actual expense is passed in", function() {
    let category = TestUtils.renderIntoDocument(
      <SubCategoryEdit income={false} actualAmount={this.actualAmount} />
    );
    let message = TestUtils.findRenderedDOMComponentWithClass(
      category,
      "sub-category-message"
    ).textContent;
    expect(message).toEqual("$" + this.actualAmount + " spent so far");
  });
});
