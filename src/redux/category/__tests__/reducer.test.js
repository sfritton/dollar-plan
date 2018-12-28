import {
  handleSetActiveCategory,
  handleUpdateTransactionDetails
} from "../reducer";

describe("categoryReducer", () => {
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

  describe("updateTransactionDetails", () => {
    it("does nothing if the transaction does not exist", () => {
      const state = {
        transactions: []
      };

      const payload = { id: "0", description: "feed me" };

      const result = handleUpdateTransactionDetails(state, payload);

      expect(result).toBe(state);
    });

    it("updates the transaction", () => {
      const state = {
        transactions: [{ id: "0", description: "feed" }]
      };

      const payload = { id: "0", description: "feed me" };

      const result = handleUpdateTransactionDetails(state, payload);

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
});
