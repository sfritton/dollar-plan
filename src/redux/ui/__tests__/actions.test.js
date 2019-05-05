import {
  setNewBudgetPage,
  setBudgetPage,
  setCategoryPage,
  setEditing
} from "../actions";
import { SET_PAGE, SET_EDITING } from "../actionTypes";
import { NEW_BUDGET, BUDGET, CATEGORY } from "../pages";

describe("setNewBudgetPage", () => {
  it("should return a SET_PAGE action", () => {
    expect(setNewBudgetPage()).toEqual({
      type: SET_PAGE,
      payload: { page: NEW_BUDGET }
    });
  });
});

describe("setBudgetPage", () => {
  it("should return a SET_PAGE action", () => {
    expect(setBudgetPage()).toEqual({
      type: SET_PAGE,
      payload: { page: BUDGET }
    });
  });
});

describe("setCategoryPage", () => {
  it("should return a SET_PAGE action", () => {
    expect(setCategoryPage()).toEqual({
      type: SET_PAGE,
      payload: { page: CATEGORY }
    });
  });
});

describe("setEditing", () => {
  it("should return a SET_EDITING action", () => {
    const editing = true;
    expect(setEditing(editing)).toEqual({
      type: SET_EDITING,
      payload: { editing }
    });
  });
});
