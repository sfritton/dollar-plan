import { objectToArray, classNames } from "..";

describe("objectToArray", () => {
  it("returns an empty array when passed no args", () => {
    expect(objectToArray()).toEqual([]);
  });

  it("returns an array of entries", () => {
    const obj = {
      key1: { stuff1: false, thing1: true },
      key2: { stuff2: true, thing2: false }
    };

    expect(objectToArray(obj)).toEqual([
      {
        id: "key1",
        stuff1: false,
        thing1: true
      },
      {
        id: "key2",
        stuff2: true,
        thing2: false
      }
    ]);
  });
});

describe("classNames", () => {
  it("works with no args", () => {
    expect(classNames()).toBe("");
  });

  it("concatenates classNames", () => {
    expect(classNames(undefined, "apple", "banana", "cow")).toBe(
      "apple banana cow"
    );
  });

  it("applies conditional classNames", () => {
    expect(classNames({ banana: true, cow: false }, "apple")).toBe(
      "apple banana"
    );
  });
});
