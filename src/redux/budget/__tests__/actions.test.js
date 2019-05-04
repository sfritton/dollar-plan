import {
  saveBudget,
  addCategoryGroup,
  updateCategoryGroupTitle,
  updateCategoryTitle,
  updateCategoryAmount,
  updateCategoryNotes,
  addCategory,
  saveCategoryToBudget
} from "../actions";
import {
  SAVE_BUDGET,
  ADD_CATEGORY_GROUP,
  UPDATE_CATEGORY_GROUP_TITLE,
  ADD_CATEGORY,
  UPDATE_CATEGORY_DETAILS,
  SAVE_CATEGORY_TO_BUDGET
} from "../actionTypes";

describe("saveBudget", () => {
  it("returns a SAVE_BUDGET action", () => {
    expect(saveBudget()).toEqual({
      type: SAVE_BUDGET,
      payload: {}
    });
  });
});

describe("addCategoryGroup", () => {
  it("returns an ADD_CATEGORY_GROUP action", () => {
    expect(addCategoryGroup()).toEqual({
      type: ADD_CATEGORY_GROUP,
      payload: {}
    });
  });
});

describe("updateCategoryGroupTitle", () => {
  it("returns an UPDATE_CATEGORY_GROUP_TITLE action", () => {
    const groupId = "123";
    const title = "Investments";

    expect(updateCategoryGroupTitle(groupId, title)).toEqual({
      type: UPDATE_CATEGORY_GROUP_TITLE,
      payload: { groupId, title }
    });
  });
});

describe("updateCategoryTitle", () => {
  it("returns an UPDATE_CATEGORY_DETAILS action", () => {
    const groupId = "123";
    const catId = "234";
    const title = "Donations";

    expect(updateCategoryTitle(groupId, catId, title)).toEqual({
      type: UPDATE_CATEGORY_DETAILS,
      payload: { groupId, catId, title }
    });
  });
});

describe("updateCategoryAmount", () => {
  it("returns an UPDATE_CATEGORY_DETAILS action", () => {
    const groupId = "123";
    const catId = "234";
    const plannedAmount = 500;

    expect(updateCategoryAmount(groupId, catId, plannedAmount)).toEqual({
      type: UPDATE_CATEGORY_DETAILS,
      payload: { groupId, catId, plannedAmount }
    });
  });
});

describe("updateCategoryNotes", () => {
  it("returns an UPDATE_CATEGORY_DETAILS action", () => {
    const groupId = "123";
    const catId = "234";
    const notes = "Whoo! Donations!";

    expect(updateCategoryNotes(groupId, catId, notes)).toEqual({
      type: UPDATE_CATEGORY_DETAILS,
      payload: { groupId, catId, notes }
    });
  });
});

describe("addCategory", () => {
  it("returns an ADD_CATEGORY action", () => {
    const groupId = "123";

    expect(addCategory(groupId)).toEqual({
      type: ADD_CATEGORY,
      payload: { groupId }
    });
  });
});

describe("saveCategoryToBudget", () => {
  it("returns an action creator", () => {
    expect(saveCategoryToBudget()).toBeInstanceOf(Function);
  });

  it("dispatches a SAVE_CATEGORY_TO_BUDGET action", () => {
    const category = { title: "Donations", transactions: [] };
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue({ category });

    const actionCreator = saveCategoryToBudget();

    actionCreator(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: SAVE_CATEGORY_TO_BUDGET,
      payload: { category }
    });
  });
});
