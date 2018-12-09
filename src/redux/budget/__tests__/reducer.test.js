import {
  getMaxObjectKey,
  handleGetBudget,
  handleAddCategory,
  handleAddCategoryGroup
} from "../reducer";

import fs from "fs";

jest.mock("fs");

describe("budgetReducer", () => {
  describe("getActiveBudget", () => {
    it("should return the budget", () => {
      const budget = {
        date: {
          month: 1,
          year: 2018
        },
        categoryGroups: {}
      };

      fs.readFileSync.mockReturnValue(JSON.stringify(budget));

      const result = handleGetBudget({}, { month: 1, year: 2018 });

      expect(result).toMatchInlineSnapshot(`
Object {
  "categoryGroups": Object {},
  "date": Object {
    "month": 1,
    "year": 2018,
  },
  "isLoaded": true,
}
`);
    });
  });

  describe("addCategory", () => {
    it("should return state for an undefined key", () => {
      const state = {
        categoryGroups: {
          income: {
            categories: {}
          }
        }
      };

      const result = handleAddCategory(state, {});

      expect(result).toBe(state);
    });

    it("should return state for an unknown key", () => {
      const state = {
        categoryGroups: {
          income: {
            categories: {}
          }
        }
      };

      const result = handleAddCategory(state, { groupId: "abc" });

      expect(result).toBe(state);
    });

    it("should add a new category", () => {
      const state = {
        categoryGroups: {
          income: {
            categories: {
              "0": {},
              "1": {}
            }
          }
        }
      };

      const result = handleAddCategory(state, { groupId: "income" });

      expect(result).toMatchInlineSnapshot(`
Object {
  "categoryGroups": Object {
    "income": Object {
      "categories": Object {
        "0": Object {},
        "1": Object {},
        "2": Object {
          "notes": "",
          "plannedAmount": 0,
          "title": "",
          "transactions": Array [],
        },
      },
    },
  },
}
`);
    });
  });

  describe("addCategoryGroup", () => {
    it("should add a category group", () => {
      const state = {
        categoryGroups: {
          income: { }
        }
      };

      const result = handleAddCategoryGroup(state);

      expect(result).toMatchInlineSnapshot();
    })
  })

  describe("getMaxObjectKey", () => {
    it("should return the largest numeric key", () => {
      const obj = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4
      };

      expect(getMaxObjectKey(obj)).toBe(4);
    });

    it("should ignore non-numeric keys", () => {
      const obj = {
        "1": 1,
        "2": 2,
        "3": 3,
        income: 4
      };

      expect(getMaxObjectKey(obj)).toBe(3);
    });

    it("should return 0 for an empty object", () => {
      const obj = {};

      expect(getMaxObjectKey(obj)).toBe(-1);
    });
  });
});
