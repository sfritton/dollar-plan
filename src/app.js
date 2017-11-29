import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/root/root";
import FileService from "./services/file-service";
require("./app.less");

ReactDOM.render(
  <Root fileService={new FileService()} />,
  document.getElementById("content")
);
