import React from "react";
import TestUtils from "react-dom/test-utils";
import expect from "expect";

import TextInput from "./text-input";

describe("TextInput", function() {
  it("renders without problems", function() {
    const input = TestUtils.renderIntoDocument(<TextInput />);
    expect(input).toBeTruthy();
  });
});
