import React from "react";
import { classNames } from "Util";
import "./card.less";

const Card = ({ children, clickable, fullWidth, onClick }) => {
  const Tag = clickable ? "a" : "div";

  return (
    <Tag
      href={clickable ? "#" : ""}
      className={classNames(
        { "card--btn": clickable, "card--full-width": fullWidth },
        "card"
      )}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </Tag>
  );
};

export default Card;
