import {
  getMaxId,
  handleSetActiveCategory,
  handleUpdateTransaction,
  handleDeleteTransaction,
  handleAddTransaction
} from "../reducer";

describe("categoryReducer", () => {
  describe("getMaxId", () => {
    it("returns -1 with no args", () => {
      expect(getMaxId([])).toBe(-1);
    });

    it("returns -1 for an empty array", () => {
      expect(getMaxId([])).toBe(-1);
    });

    it("returns -1 for undefined ids", () => {
      expect(getMaxId([{}])).toBe(-1);
    });

    it("ignores non-numeric ids", () => {
      expect(getMaxId([{ id: "abc" }])).toBe(-1);
    });

    it("converts numeric ids to numbers", () => {
      expect(getMaxId([{ id: "3" }])).toBe(3);
    });

    it("returns the max id", () => {
      expect(getMaxId([{ id: 3 }, { id: 4 }])).toBe(4);
    });
  });

  describe("setActiveCategory", () => {
    it("sets the new category", () => {
      const payload = {
        catId: "0",
        groupId: "1",
        category: {
          title: "Category 5",
          notes: "I like this one",
          plannedAmount: 0,
          transactions: []
        }
      };

      const result = handleSetActiveCategory({}, payload);

      expect(result).toMatchInlineSnapshot(`
Object {
  "groupId": "1",
  "id": "0",
  "notes": "I like this one",
  "plannedAmount": 0,
  "title": "Category 5",
  "transactions": Array [],
}
`);
    });
  });

  describe("updateTransaction", () => {
    it("does nothing if the transaction does not exist", () => {
      const state = {
        transactions: []
      };

      const payload = { id: "0", description: "feed me" };

      const result = handleUpdateTransaction(state, payload);

      expect(result).toBe(state);
    });

    it("updates the transaction", () => {
      const state = {
        transactions: [{ id: "0", description: "feed" }]
      };

      const payload = { id: "0", description: "feed me" };

      const result = handleUpdateTransaction(state, payload);

      expect(result).toMatchInlineSnapshot(`
Object {
  "transactions": Array [
    Object {
      "description": "feed me",
      "id": "0",
    },
  ],
}
`);
    });
  });

  describe("deleteTransaction", () => {
    it("does nothing if the transaction does not exist", () => {
      const state = {
        transactions: [
          { id: "0", description: "feed me" },
          { id: "1", description: "feed me now" }
        ]
      };

      const payload = { id: "2" };

      const result = handleDeleteTransaction(state, payload);

      expect(result).toEqual(state);
    });

    it("deletes the transaction", () => {
      const state = {
        transactions: [
          { id: "0", description: "feed me" },
          { id: "1", description: "feed me now" }
        ]
      };

      const payload = { id: "1" };

      const result = handleDeleteTransaction(state, payload);

      expect(result).toMatchInlineSnapshot(`
Object {
  "transactions": Array [
    Object {
      "description": "feed me",
      "id": "0",
    },
  ],
}
`);
    });
  });

  describe("addTransaction", () => {
    it("adds a transaction", () => {
      const state = {
        transactions: []
      };

      const payload = { date: { month: 1, year: 2018 } };

      const result = handleAddTransaction(state, payload);

      expect(result).toMatchInlineSnapshot(`
Object {
  "transactions": Array [
    Object {
      "amount": 0,
      "date": 31,
      "description": "",
      "id": 0,
    },
  ],
}
`);
    });
  });
});
