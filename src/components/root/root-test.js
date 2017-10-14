import React from "react"; // eslint-disable-line no-unused-vars
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Root from "./root";
import Welcome from "../welcome/welcome";

describe("root", function() {
  beforeEach(function() {
    this.root = TestUtils.renderIntoDocument(<Root />);
  });

  it("renders without problems", function() {
    expect(this.root).toBeTruthy();
  });

  // temporarily deactivated while creating/testing new pages
  xit("renders the Welcome component", function() {
    const welcomes = TestUtils.scryRenderedComponentsWithType(
      this.root,
      Welcome
    );
    expect(welcomes.length).toEqual(1);
  });
});
