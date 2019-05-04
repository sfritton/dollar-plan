import * as fs from "fs";
import { getAllBudgets, getBudget, createNewBudget } from "../actions";
import { GET_ALL_BUDGETS, GET_BUDGET } from "../../actionTypes";
import { CREATE_NEW_BUDGET } from "../actionTypes";

jest.mock("fs");

describe("getAllBudgets", () => {
  it("reads budgets from the data directory", () => {
    const action = getAllBudgets();

    expect(fs.readdirSync).toHaveBeenCalledTimes(1);

    expect(action).toEqual({
      type: GET_ALL_BUDGETS,
      payload: {
        budgets: {
          "2018-01": { isLoaded: false },
          "2018-02": { isLoaded: false }
        }
      }
    });
  });
});

describe("getBudget", () => {
  it("returns an action creator", () => {
    expect(getBudget(10, 2018)).toBeInstanceOf(Function);
  });

  it("returns the budget if it's loaded", () => {
    const month = 10;
    const year = 2018;

    const actionCreator = getBudget(month, year);

    const budget = {
      isLoaded: true,
      categoryGroups: {},
      date: { month, year }
    };

    const state = {
      budgets: {
        [`${year}-${month}`]: budget
      }
    };

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    actionCreator(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_BUDGET,
      payload: { budget }
    });
  });

  it("fetches the budget if it's not loaded", () => {
    const month = 2;
    const year = 2018;

    const actionCreator = getBudget(month, year);

    const state = { budgets: { isLoaded: false } };

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    actionCreator(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_BUDGET,
      payload: {
        budget: {
          categoryGroups: {},
          date: { month: 2, year: 2018 },
          isLoaded: true
        },
        id: `${year}-0${month}`
      }
    });
  });
});

describe("createNewBudget", () => {
  it("returns an action creator", () => {
    expect(createNewBudget(10, 2018)).toBeInstanceOf(Function);
  });

  it("dispatches a CREATE_NEW_BUDGET action", () => {
    const month = 10;
    const year = 2018;
    const dispatch = jest.fn();
    const getState = jest.fn();

    const actionCreator = createNewBudget(month, year);

    actionCreator(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: CREATE_NEW_BUDGET,
      payload: { month, year }
    });
    expect(getState).not.toHaveBeenCalled();
  });

  it("handles a non-existent old budget", () => {
    const month = 10;
    const year = 2018;
    const oldMonth = 11;
    const oldYear = 2017;
    const state = { budgets: {} };

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = createNewBudget(month, year, oldMonth, oldYear);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: CREATE_NEW_BUDGET,
      payload: { month, year }
    });
  });

  it("loads a missing old budget", () => {
    const month = 10;
    const year = 2018;
    const oldMonth = 11;
    const oldYear = 2017;
    const state = {
      budgets: {
        [`${oldYear}-${oldMonth}`]: { isLoaded: false }
      }
    };
    const newState = {
      budgets: {
        [`${oldYear}-${oldMonth}`]: {
          isLoaded: true,
          date: { month: oldMonth, year: oldYear },
          categoryGroups: {}
        }
      }
    };

    const dispatch = jest.fn();
    const getState = jest
      .fn()
      .mockReturnValueOnce(state)
      .mockReturnValue(newState);

    const actionCreator = createNewBudget(month, year, oldMonth, oldYear);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledTimes(2);
    // second call, first arg
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: CREATE_NEW_BUDGET,
      payload: {
        month,
        year,
        oldBudget: newState.budgets[`${oldYear}-${oldMonth}`]
      }
    });
  });

  it("adds the old budget to the payload", () => {
    const month = 10;
    const year = 2018;
    const oldMonth = 11;
    const oldYear = 2017;
    const state = {
      budgets: {
        [`${oldYear}-${oldMonth}`]: {
          isLoaded: true,
          date: { month: oldMonth, year: oldYear },
          categoryGroups: {}
        }
      }
    };

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);

    const actionCreator = createNewBudget(month, year, oldMonth, oldYear);

    actionCreator(dispatch, getState);

    expect(getState).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: CREATE_NEW_BUDGET,
      payload: {
        month,
        year,
        oldBudget: state.budgets[`${oldYear}-${oldMonth}`]
      }
    });
  });
});
