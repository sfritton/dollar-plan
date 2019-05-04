import createReducer from "../createReducer";

describe("createReducer", () => {
  it("handles no args", () => {
    const reducer = createReducer();
    expect(reducer()).toEqual({});
  });

  it("sets the initial state", () => {
    const initialState = { test: true };
    const reducer = createReducer({}, initialState);
    expect(reducer()).toBe(initialState);
  });
});

describe("reducer", () => {
  it("returns the state if no handler is found", () => {
    const state = { test: true };
    const reducer = createReducer();
    expect(reducer(state)).toBe(state);
  });

  it("calls the correct actionHandler", () => {
    const mockHandler = jest.fn();
    const mockResult = { test: false };
    mockHandler.mockReturnValue(mockResult);

    const type = "TYPE";
    const actionHandlers = { [type]: mockHandler };

    const reducer = createReducer(actionHandlers);

    const state = { test: true };
    const action = { type, payload: {} };
    const nextState = reducer(state, action);

    expect(mockHandler).toHaveBeenCalledWith(state, action.payload);
    expect(nextState).toBe(mockResult);
  });
});
