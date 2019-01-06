import {
  getMaxObjectKey,
  handleGetBudget,
  handleAddCategory,
  handleAddCategoryGroup,
  handleSaveBudget,
  handleSaveCategoryToBudget,
  handleUpdateCategoryGroupTitle,
  handleUpdateCategoryDetails
} from "../reducer";

import fs from "fs";

jest.mock("fs");

describe("budgetReducer", () => {
  describe("getBudget", () => {
    it("should return the budget", () => {
      const budget = {
        date: {
          month: 1,
          year: 2018
        },
        categoryGroups: {},
        isLoaded: true
      };

      const result = handleGetBudget({}, { budget });

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
          income: {}
        }
      };

      const result = handleAddCategoryGroup(state);

      expect(result).toMatchInlineSnapshot(`
Object {
  "categoryGroups": Object {
    "0": Object {
      "categories": Object {
        "0": Object {
          "notes": "",
          "plannedAmount": 0,
          "title": "",
          "transactions": Array [],
        },
      },
      "title": "",
    },
    "income": Object {},
  },
}
`);
    });
  });

  describe("saveBudget", () => {
    it("should do nothing if there is no date", () => {
      const budget = {
        categoryGroups: {}
      };

      handleSaveBudget(budget);

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it("should write to the file", () => {
      const budget = {
        date: {
          month: 1,
          year: 2019
        },
        categoryGroups: {}
      };

      handleSaveBudget(budget);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "data_new\\2019-01.json",
        JSON.stringify(budget)
      );
    });

    it("should filter out isLoaded", () => {
      const date = { month: 1, year: 2019 };

      handleSaveBudget({ date, isLoaded: true });

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "data_new\\2019-01.json",
        JSON.stringify({ date })
      );
    });
  });

  describe("saveCategoryToBudget", () => {
    it("should do nothing for a non-matching group id", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {}
          }
        }
      };

      const payload = { category: { groupId: "5" } };

      const result = handleSaveCategoryToBudget(state, payload);

      expect(result).toBe(state);
    });

    it("should do nothing for a non-matching category id", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {
              "0": {
                title: "Donation"
              }
            }
          }
        }
      };

      const payload = { category: { groupId: "0", id: "5" } };

      const result = handleSaveCategoryToBudget(state, payload);

      expect(result).toBe(state);
    });

    it("should save the category to the budget", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {
              "0": {
                title: "Donation"
              }
            }
          }
        }
      };

      const payload = {
        category: {
          groupId: "0",
          id: "0",
          title: "Donations",
          transactions: [{ id: "0", description: "ACLU" }]
        }
      };

      const result = handleSaveCategoryToBudget(state, payload);

      expect(result).toMatchInlineSnapshot(`
Object {
  "categoryGroups": Object {
    "0": Object {
      "categories": Object {
        "0": Object {
          "title": "Donations",
          "transactions": Array [
            Object {
              "description": "ACLU",
              "id": "0",
            },
          ],
        },
      },
      "title": "Investment",
    },
  },
}
`);
    });
  });

  describe("updateCategoryGroupTitle", () => {
    it("should do nothing for an unmatching group id", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {}
          }
        }
      };

      const result = handleUpdateCategoryGroupTitle(state, {
        groupId: "1",
        title: "Investments"
      });

      expect(result).toBe(state);
    });

    it("should update the category group title", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {}
          }
        }
      };

      const result = handleUpdateCategoryGroupTitle(state, {
        groupId: "0",
        title: "Investments"
      });

      expect(result).toMatchInlineSnapshot(`
Object {
  "categoryGroups": Object {
    "0": Object {
      "categories": Object {},
      "title": "Investments",
    },
  },
}
`);
    });
  });

  describe("updateCategoryDetails", () => {
    it("should do nothing for an unmatching group id", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {}
          }
        }
      };

      const result = handleUpdateCategoryDetails(state, {
        groupId: "1",
        catId: "2",
        title: "Investments"
      });

      expect(result).toBe(state);
    });

    it("should do nothing for an unmatching category id", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {}
          }
        }
      };

      const result = handleUpdateCategoryDetails(state, {
        groupId: "0",
        catId: "2",
        title: "Investments"
      });

      expect(result).toBe(state);
    });

    it("should update the category title", () => {
      const state = {
        categoryGroups: {
          "0": {
            title: "Investment",
            categories: {
              "1": {
                title: "Banana"
              }
            }
          }
        }
      };

      const result = handleUpdateCategoryDetails(state, {
        groupId: "0",
        catId: "1",
        title: "Bananas"
      });

      expect(result).toMatchInlineSnapshot(`
Object {
  "categoryGroups": Object {
    "0": Object {
      "categories": Object {
        "1": Object {
          "title": "Bananas",
        },
      },
      "title": "Investment",
    },
  },
}
`);
    });
  });

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

    it("should return -1 for an empty object", () => {
      const obj = {};

      expect(getMaxObjectKey(obj)).toBe(-1);
    });
  });
});
