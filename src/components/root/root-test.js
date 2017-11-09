import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Root from "./root";
import Page from "../page/page";
import Welcome from "../welcome/welcome";

describe("root", function() {
  beforeEach(function() {
    this.root = TestUtils.renderIntoDocument(<Root />);
  });

  it("renders without problems", function() {
    expect(this.root).toBeTruthy();
  });

  it("renders the welcome page by default", function() {
    const welcomes = TestUtils.scryRenderedComponentsWithType(
      this.root,
      Welcome
    );

    expect(welcomes.length).toEqual(1);
  });

  it("shows a 404 page when path isn't recognized", function() {
    this.root.navigateTo("razzle-dazzle");

    const welcomes = TestUtils.scryRenderedComponentsWithType(
      this.root,
      Welcome
    );
    const page = TestUtils.findRenderedComponentWithType(this.root, Page);
    const header = TestUtils.findRenderedDOMComponentWithClass(
      page,
      "pg-header"
    );

    expect(welcomes.length).toEqual(0);
    expect(header.textContent).toContain("Error 404");
  });

  it("returns to the previous page on navigate back", function() {
    this.root.navigateTo("razzle-dazzle");
    this.root.navigateBack();

    const welcomes = TestUtils.scryRenderedComponentsWithType(
      this.root,
      Welcome
    );

    expect(welcomes.length).toEqual(1);
  });
});
