import { handleGetAllBudgets, handleGetBudget } from "../reducer";

describe("budgets reducer", () => {
  describe("get all budgets", () => {
    it("returns an empty object if there are no budgets", () => {
      expect(handleGetAllBudgets({}, {})).toEqual({});
    });

    it("returns the budgets", () => {
      const budgets = { "2018-02": { isLoaded: false } };

      expect(handleGetAllBudgets({}, { budgets })).toBe(budgets);
    });
  });

  describe("get budget", () => {
    it("returns state for undefined id", () => {
      const state = {};

      expect(handleGetBudget(state, {})).toBe(state);
    });

    it("adds a new budget", () => {
      const state = { "0": { isLoaded: false } };

      const payload = { budget: { isLoaded: true }, id: "1" };

      expect(handleGetBudget(state, payload)).toMatchInlineSnapshot(`
Object {
  "0": Object {
    "isLoaded": false,
  },
  "1": Object {
    "isLoaded": true,
  },
}
`);
    });

    it("replaces an existing budget", () => {
      const state = { "0": { isLoaded: false } };

      const payload = { budget: { isLoaded: true }, id: "0" };

      expect(handleGetBudget(state, payload)).toMatchInlineSnapshot(`
Object {
  "0": Object {
    "isLoaded": true,
  },
}
`);
    });
  });
});
