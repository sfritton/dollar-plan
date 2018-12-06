import { handleGetBudget } from "../budget-reducer";

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
    it("should have tests", () {
      expect(true).toBe(false);
    });
  });
});
