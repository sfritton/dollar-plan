import React from "react";
import "./row.less";

const Row = ({ children, clickable, header, onClick }) => {
  const Tag = clickable ? 'button' : 'div';

  return (
    <Tag
      className={`row ${clickable ? "row--btn" : ""} ${header ? "row--header" : ""}`}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

export default Row;
