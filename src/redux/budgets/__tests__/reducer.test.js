import {
  handleGetAllBudgets,
  handleGetBudget,
  handleCreateNewBudget
} from "../reducer";

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

  describe("create new budget", () => {
    it("returns the state if the budget already exists", () => {
      const state = { "2018-01": { isLoaded: true } };
      const payload = { month: 1, year: 2018 };

      expect(handleCreateNewBudget(state, payload)).toBe(state);
    });

    it("returns a new budget", () => {
      const state = { "2018-01": { isLoaded: true } };
      const payload = { month: 2, year: 2018 };

      expect(handleCreateNewBudget(state, payload)).toMatchInlineSnapshot(`
Object {
  "2018-01": Object {
    "isLoaded": true,
  },
  "2018-02": Object {
    "categoryGroups": Object {
      "income": Object {
        "categories": Object {},
        "title": "",
      },
    },
    "date": Object {
      "month": 2,
      "year": 2018,
    },
    "isLoaded": true,
  },
}
`);
    });

    it("returns a copy of the old budget with cleared transactions", () => {
      const oldBudget = {
        date: { month: 1, year: 2018 },
        isLoaded: true,
        categoryGroups: {
          "0": {
            categories: {
              "5": {
                transactions: [{ id: "1" }, { id: "2" }]
              }
            }
          }
        }
      };
      const state = { "2018-01": oldBudget };
      const payload = { month: 2, year: 2018, oldBudget };

      expect(handleCreateNewBudget(state, payload)).toMatchInlineSnapshot(`
Object {
  "2018-01": Object {
    "categoryGroups": Object {
      "0": Object {
        "categories": Object {
          "5": Object {
            "transactions": Array [
              Object {
                "id": "1",
              },
              Object {
                "id": "2",
              },
            ],
          },
        },
      },
    },
    "date": Object {
      "month": 1,
      "year": 2018,
    },
    "isLoaded": true,
  },
  "2018-02": Object {
    "categoryGroups": Object {
      "0": Object {
        "categories": Object {
          "5": Object {
            "transactions": Array [],
          },
        },
      },
    },
    "date": Object {
      "month": 2,
      "year": 2018,
    },
    "isLoaded": true,
  },
}
`);
    });
  });
});
