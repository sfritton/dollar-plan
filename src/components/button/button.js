import React from "react";
import { classNames } from "Util";
import "./button.less";

const Button = ({
  children,
  secondary,
  outlined,
  small,
  onClick,
  className
}) => (
  <button
    className={classNames(
      {
        "btn-secondary": secondary,
        "btn-outline": outlined,
        "btn-small": small
      },
      "btn",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
