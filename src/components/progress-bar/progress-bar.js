import React from "react";
import "./progress-bar.less";

const ProgressBar = ({ numerator, denominator, danger }) => {
  if (denominator <= 0 && numerator <= 0) {
    return <div className="progress-bar progress-bar--null" />;
  }

  if (numerator <= 0) {
    return <div className="progress-bar" />;
  }

  if (numerator > denominator) {
    return (
      <div
        className={`progress-bar progress-bar--${danger ? "danger" : "full"}`}
      />
    );
  }

  const percent = Math.floor(numerator / denominator * 100);

  return (
    <div className="progress-bar">
      <div style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;
