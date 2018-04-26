import React from "react";
import "./button.less";

const Button = ({ children, secondary, small, onClick }) => (
  <button
    className={`btn ${secondary && "btn-secondary"} ${small && "btn-small"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
