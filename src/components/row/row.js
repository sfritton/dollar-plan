import React from "react";
import "./row.less";

const Row = ({ children, focusable, header, onClick }) => (
  <div
    className={`row ${focusable && "row-focusable"} ${header && "header"}`}
    tabIndex={focusable ? '0' : undefined}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Row;
