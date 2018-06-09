import React from "react";
import "./button.less";

const Button = ({ children, secondary, small, onClick, className }) => (
  <button
    className={`btn ${secondary ? "btn-secondary" : ''} ${small ? "btn-small" : ''} ${className ? className : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
