import React from 'react';

import Row from '../row/row';
import ProgressBar from '../progress-bar/progress-bar';
import Input from "../input/input";
import { getDollarString } from "Util/currency";

const GroupTitle = ({ editing, title, updateTitle }) => {
  if (editing) {
    return (
      <Input
        className="category-title category-input"
        value={title}
        placeholder="Group name"
        onChange={e => updateTitle(e.target.value)}
      />
    );
  }

  return (
    <div className="category-title">
      <h3>{title}</h3>
    </div>
  );
};

const GroupAmount = ({ actualAmount, plannedAmount }) => {
  const actualAmountStr = getDollarString(actualAmount);
  const plannedAmountStr = getDollarString(plannedAmount);

  return (
    <div className="category-amount">
      <h3>{`$${actualAmountStr} of $${plannedAmountStr}`}</h3>
    </div>
  );
};

const GroupHeader = ({
  editing,
  title,
  actualAmount,
  plannedAmount,
  updateTitle,
  income
}) => (
  <Row header>
    <GroupTitle
      editing={editing}
      title={title}
      updateTitle={updateTitle}
    />
    <GroupAmount
      actualAmount={actualAmount}
      plannedAmount={plannedAmount}
    />
    <ProgressBar
      numerator={actualAmount}
      denominator={plannedAmount}
      danger={!income}
    />
  </Row>
);

export default GroupHeader;
