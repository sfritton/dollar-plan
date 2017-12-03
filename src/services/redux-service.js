import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

("use strict");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME_PENDING":
      return { ...state, loading: true };
    case "CHANGE_NAME_REJECTED":
      return { ...state, loading: false, error: action.payload };
    case "CHANGE_NAME_FULFILLED":
      return { ...state, loading: false, name: action.payload };
    case "CHANGE_AGE":
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

const tweetsReducer = (state = [], action) => {
  return state;
};

const middleware = applyMiddleware(promise(), thunk, logger);

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const testStore = () => {
  const store = createStore(reducers, middleware);

  store.dispatch({
    type: "CHANGE_NAME",
    payload: "async thing"
  });
  store.dispatch({ type: "CHANGE_AGE", payload: 35 });
};

export default testStore;
