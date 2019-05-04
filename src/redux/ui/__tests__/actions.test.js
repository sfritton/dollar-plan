import {
  setWelcomePage,
  setBudgetPage,
  setCategoryPage,
  setEditing
} from "../actions";
import { SET_PAGE, SET_EDITING } from "../actionTypes";
import { WELCOME, BUDGET, CATEGORY } from "../pages";

describe("setWelcomePage", () => {
  it("should return a SET_PAGE action", () => {
    expect(setWelcomePage()).toEqual({
      type: SET_PAGE,
      payload: { page: WELCOME }
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
