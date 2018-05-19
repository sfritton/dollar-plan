import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";
import { Glyphicon } from "react-bootstrap";

import Category from "./category";
import SubCategory from "../sub-category/sub-category";
import ProgressBar from "../progress-bar/progress-bar";
import Input from "../input/input";

describe("Category", function() {
  beforeEach(function() {
    this.title = "Apartment";
    this.subCategories = [
      { title: "Groceries", plannedAmount: 230, actualAmount: 100 },
      { title: "Clothing", plannedAmount: 10, actualAmount: 5 }
    ];
    this.category = TestUtils.renderIntoDocument(
      <Category
        title={this.title}
        defaultOpen
        subCategories={this.subCategories}
      />
    );
  });

  it("renders without problems", function() {
    expect(this.category).toBeTruthy();
  });

  it("renders exactly 1 category-title", function() {
    const titles = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "category-title"
    );

    expect(titles.length).toEqual(1);
    expect(titles[0].textContent).toEqual(this.title);
  });

  it("renders exactly 1 category-amount", function() {
    const amounts = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "category-amount"
    );

    expect(amounts.length).toEqual(1);
    expect(amounts[0].textContent).toContain(
      this.subCategories.reduce((sum, sub) => {
        return sum + sub.plannedAmount;
      }, 0)
    );
    expect(amounts[0].textContent).toContain(
      this.subCategories.reduce((sum, sub) => {
        return sum + sub.actualAmount;
      }, 0)
    );
  });

  it("renders exactly 3 ProgressBar component", function() {
    const bars = TestUtils.scryRenderedComponentsWithType(
      this.category,
      ProgressBar
    );
    expect(bars.length).toEqual(3);
  });

  it("renders exactly 2 sub-categories", function() {
    const subCats = TestUtils.scryRenderedComponentsWithType(
      this.category,
      SubCategory
    );
    expect(subCats.length).toEqual(2);
  });

  it("renders exactly one chevron", function() {
    const glyphs = TestUtils.scryRenderedComponentsWithType(
      this.category,
      Glyphicon
    );
    expect(glyphs.length).toEqual(1);
  });

  it("starts open when defaultOpen is true", function() {
    const chevronOpens = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-open"
    );
    const chevronCloseds = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-closed"
    );

    expect(chevronOpens.length).toEqual(1);
    expect(chevronCloseds.length).toEqual(0);
  });

  it("starts closed when defaultOpen is false", function() {
    const cat = TestUtils.renderIntoDocument(
      <Category title={this.title} subCategories={this.subCategories} />
    );

    const chevronOpens = TestUtils.scryRenderedDOMComponentsWithClass(
      cat,
      "chevron-open"
    );
    const chevronCloseds = TestUtils.scryRenderedDOMComponentsWithClass(
      cat,
      "chevron-closed"
    );

    expect(chevronOpens.length).toEqual(0);
    expect(chevronCloseds.length).toEqual(1);
  });

  it("opens or closes when the header is clicked", function() {
    const header = TestUtils.findRenderedDOMComponentWithClass(
      this.category,
      "category"
    );
    let chevronOpens = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-open"
    );
    let chevronCloseds = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-closed"
    );

    expect(chevronOpens.length).toEqual(1);
    expect(chevronCloseds.length).toEqual(0);

    TestUtils.Simulate.click(header);

    chevronOpens = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-open"
    );
    chevronCloseds = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-closed"
    );

    expect(chevronOpens.length).toEqual(0);
    expect(chevronCloseds.length).toEqual(1);

    TestUtils.Simulate.click(header);

    chevronOpens = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-open"
    );
    chevronCloseds = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category,
      "chevron-closed"
    );

    expect(chevronOpens.length).toEqual(1);
    expect(chevronCloseds.length).toEqual(0);
  });

  it("renders the title as an input when in edit mode", function() {
    const category = TestUtils.renderIntoDocument(
      <Category
        title={this.title}
        defaultOpen
        edit
        subCategories={this.subCategories}
      />
    );
    const titles = TestUtils.scryRenderedComponentsWithType(
      category,
      Input
    );

    expect(titles[0].props.value).toEqual(this.title);
  });
});
