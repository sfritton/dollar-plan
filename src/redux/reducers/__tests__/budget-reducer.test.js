import { handleSetActiveBudget } from "../budget-reducer";

import fs from "fs";

jest.mock("fs");

describe("budgetReducer", () => {
  describe("setActiveBudget", () => {
    it("should return the budget", () => {
      const budget = {
        date: {
          month: 1,
          year: 2018
        },
        categoryGroups: {}
      };

      fs.readFileSync.mockReturnValue(JSON.stringify(budget));

      const result = handleSetActiveBudget({}, { month: 1, year: 2018 });

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
});
