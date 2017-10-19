import React from "react"; // eslint-disable-line no-unused-vars
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import ProgressBar from "./progress-bar";

describe("ProgressBar", function() {
  it("renders without problems", function() {
    const progressBar = TestUtils.renderIntoDocument(
      <ProgressBar income={false} percent={1} />
    );
    expect(progressBar).toBeTruthy();
  });

  it("renders a number below 0 correctly", function() {
    testProgressBar(-0.5, false, 1, 0, 0);
  });

  it("renders 0 correctly", function() {
    testProgressBar(0, false, 1, 0, 0);
  });

  it("renders a number between 1 and 0 correctly", function() {
    testProgressBar(0.25, false, 1, 1, 0);
  });

  it("renders 1 correctly", function() {
    testProgressBar(1, false, 1, 1, 0);
  });

  it("renders a number above 1 correctly for expenses", function() {
    testProgressBar(1.5, false, 0, 0, 1);
  });

  it("renders a number above 1 correctly for income", function() {
    testProgressBar(1.5, true, 0, 1, 0);
  });
});

function testProgressBar(percent, income, nOuters, nInners, nDangers) {
  const progressBar = TestUtils.renderIntoDocument(
    <ProgressBar income={income} percent={percent} />
  );

  const outers = TestUtils.scryRenderedDOMComponentsWithClass(
    progressBar,
    "progbar-outer"
  );
  const inners = TestUtils.scryRenderedDOMComponentsWithClass(
    progressBar,
    "progbar-inner"
  );
  const dangers = TestUtils.scryRenderedDOMComponentsWithClass(
    progressBar,
    "progbar-danger"
  );

  expect(outers.length).toEqual(nOuters);
  expect(inners.length).toEqual(nInners);
  expect(dangers.length).toEqual(nDangers);
}
