import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import Page from "./page";

describe("Page", function() {
  beforeEach(function() {
    this.title = "I AM A TITLE";
    this.bodyText = "I am text in the body";
    this.footer = "I am a footer";
    this.page = TestUtils.renderIntoDocument(
      <Page header={this.title} footer={this.footer}>
        {this.bodyText}
      </Page>
    );
  });

  it("renders without problems", function() {
    expect(this.page).toBeTruthy();
  });

  it("renders a single header with a title", function() {
    const headers = TestUtils.scryRenderedDOMComponentsWithClass(
      this.page,
      "pg-header"
    );
    expect(headers.length).toEqual(1);
    expect(headers[0].textContent).toEqual(this.title);
  });

  it("renders a single pg-body with text", function() {
    const bodies = TestUtils.scryRenderedDOMComponentsWithClass(
      this.page,
      "pg-body"
    );
    expect(bodies.length).toEqual(1);
    expect(bodies[0].textContent).toEqual(this.bodyText);
  });

  it("renders a single footer with text", function() {
    const footers = TestUtils.scryRenderedDOMComponentsWithClass(
      this.page,
      "pg-footer"
    );
    expect(footers.length).toEqual(1);
    expect(footers[0].textContent).toEqual(this.footer);
  });
});
