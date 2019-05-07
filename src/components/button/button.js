import React from "react";
import "./button.less";

const classNames = (conditionalNames = {}, ...permanentNames) =>
  Object.entries(conditionalNames)
    .reduce((acc, [key, value]) => {
      if (!value) return acc;

      return [...acc, key];
    }, permanentNames)
    .join(" ");

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
