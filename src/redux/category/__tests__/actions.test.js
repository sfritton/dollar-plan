import {
  setActiveCategory,
  resetCategory,
  updateTransactionDate,
  updateTransactionDescription,
  updateTransactionAmount,
  deleteTransaction,
  addTransaction
} from "../actions";
import {
  SET_ACTIVE_CATEGORY,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  ADD_TRANSACTION
} from "../actionTypes";

describe("setActiveCategory", () => {
  it("should return an action creator", () => {
    expect(setActiveCategory("1", "2")).toBeInstanceOf(Function);
  });

  it("dispatches a SET_ACTIVE_CATEGORY action", () => {
    const groupId = "1";
    const catId = "2";
    const category = {
      title: "Donations",
      transactions: [],
      notes: "spread the love"
    };
    const state = {
      budget: {
        categoryGroups: {
          [groupId]: {
            categories: {
              [catId]: category
            }
          }
        }
      }
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = setActiveCategory(groupId, catId);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_ACTIVE_CATEGORY,
      payload: { groupId, catId, category }
    });
  });
});

describe("resetCategory", () => {
  it("should return an action creator", () => {
    expect(resetCategory()).toBeInstanceOf(Function);
  });

  it("should dispatch a SET_ACTIVE_CATEGORY action", () => {
    const groupId = "1";
    const catId = "2";
    const category = {
      title: "Donations",
      transactions: [],
      notes: "spread the love"
    };
    const state = {
      category: {
        ...category,
        groupId,
        id: catId
      },
      budget: {
        categoryGroups: {
          [groupId]: {
            categories: {
              [catId]: category
            }
          }
        }
      }
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = resetCategory(groupId, catId);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
  });
});

describe("updateTransactionDate", () => {
  it("should return an action creator", () => {
    expect(updateTransactionDate(5, "1")).toBeInstanceOf(Function);
  });

  it("should dispatch an UPDATE_TRANSACTION action", () => {
    const id = "1";
    const month = 10;
    const year = 2018;
    const targetDay = 20;
    const state = { budget: { date: { month, year } } };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = updateTransactionDate(targetDay, id);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: UPDATE_TRANSACTION,
      payload: { date: targetDay, id }
    });
  });

  it("should correct a large date", () => {
    const id = "1";
    const month = 10;
    const year = 2018;
    const targetDay = 35;
    const state = { budget: { date: { month, year } } };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = updateTransactionDate(targetDay, id);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: UPDATE_TRANSACTION,
      payload: { date: 31, id }
    });
  });

  it("should correct a small date", () => {
    const id = "1";
    const month = 10;
    const year = 2018;
    const targetDay = 0;
    const state = { budget: { date: { month, year } } };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = updateTransactionDate(targetDay, id);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: UPDATE_TRANSACTION,
      payload: { date: 1, id }
    });
  });
});

describe("updateTransactionDescription", () => {
  it("should return an UPDATE_TRANSACTION action", () => {
    const description = 100;
    const id = "1";

    expect(updateTransactionDescription(description, id)).toEqual({
      type: UPDATE_TRANSACTION,
      payload: { description, id }
    });
  });
});

describe("updateTransactionAmount", () => {
  it("should return an UPDATE_TRANSACTION action", () => {
    const amount = 100;
    const id = "1";

    expect(updateTransactionAmount(amount, id)).toEqual({
      type: UPDATE_TRANSACTION,
      payload: { amount, id }
    });
  });
});

describe("deleteTransaction", () => {
  it("should return a DELETE_TRANSACTION action", () => {
    const id = "1";
    expect(deleteTransaction(id)).toEqual({
      type: DELETE_TRANSACTION,
      payload: { id }
    });
  });
});

describe("addTransaction", () => {
  it("should return an action creator", () => {
    expect(addTransaction()).toBeInstanceOf(Function);
  });

  it("should dispatch an ADD_TRANSACTION action", () => {
    const date = { month: 10, year: 2018 };
    const state = { budget: { date } };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = addTransaction();

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_TRANSACTION,
      payload: { date }
    });
  });
});
