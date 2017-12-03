import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import RootContainer from "./components/root/root-container";
import FileService from "./services/file-service";
require("./app.less");

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById("content")
);
