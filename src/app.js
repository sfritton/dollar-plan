import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "Redux/store";
import Root from "./containers/root/root";
import "./less/main.less";

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("content")
);
