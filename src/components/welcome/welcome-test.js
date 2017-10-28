import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Welcome from "./welcome";
import Dropdown from "../dropdown/dropdown";
import Page from "../page/page";

describe("Welcome", function() {
  beforeEach(function() {
    this.welcome = TestUtils.renderIntoDocument(<Welcome />);
  });

  it("renders without problems", function() {
    expect(this.welcome).toBeTruthy();
  });

  it("renders a Page component", function() {
    const pages = TestUtils.scryRenderedComponentsWithType(this.welcome, Page);
    expect(pages.length).toEqual(1);
  });

  it("renders 2 Dropdown components", function() {
    const dropdowns = TestUtils.scryRenderedComponentsWithType(
      this.welcome,
      Dropdown
    );
    expect(dropdowns.length).toEqual(2);
  });

  it("renders a button", function() {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
      this.welcome,
      "button"
    );
    expect(buttons.length).toEqual(1);
  });
});
