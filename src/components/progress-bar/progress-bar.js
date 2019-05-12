import React from "react";
import "./progress-bar.less";

const getProgressBarClassName = ({ numerator, denominator, danger }) => {
  if (denominator <= 0 && numerator <= 0) {
    return "progress-bar--null";
  }

  if (numerator > denominator && danger) {
    return "progress-bar--danger";
  }

  return "progress-bar--inner";
};

const ProgressBar = ({ numerator, denominator, danger }) => {
  const className = getProgressBarClassName({ numerator, denominator, danger });

  const percent = Math.max(
    Math.min(Math.floor(numerator / denominator * 100), 100),
    0
  );

  return (
    <div className="progress-bar">
      <div className={className} style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;
