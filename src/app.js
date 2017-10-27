import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";

import Root from "./components/root/root";
import budget from "../data/2017-11";
import pageEnum from "./util/page-enum";
require("./app.less");

ReactDOM.render(
  <Root page={pageEnum.BUDGET} budget={budget} />,
  document.getElementById("content")
);
