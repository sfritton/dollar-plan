import React from "react";
import './dropdown.less';

const Dropdown = ({ onChange, value, disabled, options }) => (
  <div className="select-wrapper">
    <select
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      value={value}
    >
      {options.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
