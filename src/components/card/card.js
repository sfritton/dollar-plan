import React from "react";
import "./card.less";

const Card = ({ children, clickable, onClick }) => {
  const Tag = clickable ? "a" : "div";

  return (
    <Tag
      href={clickable ? "#" : ""}
      className={`card ${clickable ? "card--btn" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </Tag>
  );
};

export default Card;
