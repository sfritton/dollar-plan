import React from "react";
import "./input.less";

const Input = ({ className, value, placeholder, onChange }) => (
  <input
    className={className}
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default Input;
