import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import BudgetFooter from "./budget-footer";

describe("BudgetFooter", function() {
  it("renders the balance", function() {
    const footer = TestUtils.renderIntoDocument(<BudgetFooter balance={100} />);
    const msg = TestUtils.findRenderedDOMComponentWithClass(
      footer,
      "footer-msg"
    );

    expect(msg.textContent).toContain("Balance:");
  });

  it("renders a negative balance correctly", function() {
    const footer = TestUtils.renderIntoDocument(
      <BudgetFooter balance={-100} />
    );
    const msg = TestUtils.findRenderedDOMComponentWithClass(
      footer,
      "footer-msg"
    );

    expect(msg.textContent).toContain("-$100");
  });

  it("renders a positive balance correctly", function() {
    const footer = TestUtils.renderIntoDocument(<BudgetFooter balance={100} />);
    const msg = TestUtils.findRenderedDOMComponentWithClass(
      footer,
      "footer-msg"
    );

    expect(msg.textContent).toContain("$100");
  });

  it("renders an 'Adjust Budget' button in non-edit mode", function() {
    const footer = TestUtils.renderIntoDocument(
      <BudgetFooter balance={100} />
    );
    const btn = TestUtils.findRenderedDOMComponentWithClass(footer, "button");

    expect(btn.textContent).toContain("Adjust Budget");
  });

  it("renders an 'Save Budget' button in edit mode", function() {
    const footer = TestUtils.renderIntoDocument(
      <BudgetFooter balance={100} edit />
    );
    const btn = TestUtils.findRenderedDOMComponentWithClass(footer, "button");

    expect(btn.textContent).toContain("Save Budget");
  });
});
