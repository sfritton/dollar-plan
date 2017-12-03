import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import Root from "./components/root/root";
import FileService from "./services/file-service";
require("./app.less");

ReactDOM.render(
  <Provider store={store}>
    <Root fileService={new FileService()} />
  </Provider>,
  document.getElementById("content")
);
