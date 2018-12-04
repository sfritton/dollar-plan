import React from "react";
import "./category.less";

import { Row, ProgressBar, Input } from 'Components';
import { getCentString, getCentNumber, getDollarString } from "Util/currency";

const Title = ({ editing, title, updateTitle }) => {
  if (editing) {
    return (
      <Input
        className="category-title-input"
        value={title}
        placeholder="Category name"
        onChange={e => updateTitle(e.target.value)}
      />
    );
  }

  return <div className="category-title">{title}</div>;
};

const Amount = ({ editing, actualAmount, plannedAmount, updateAmount }) => {
  if (editing) {
    return (
      <div className="category-amount">
        {`$${getCentString(actualAmount)} of `}
        <Input
          className="category-amount-input"
          value={getCentString(plannedAmount)}
          placeholder="0"
          onChange={e =>
            updateAmount(getCentNumber(e.target.value))}
        />
      </div>
    );
  }

  return (
    <div className="category-amount">
      {`$${getDollarString(
        actualAmount
      )} of $${getDollarString(plannedAmount)}`}
    </div>
  );
};

const generateBalanceClass = (difference, income) => {
  const base = 'category-balance';

  if (difference >= 0) return base;

  return `${base} ${income ? 'category-balance--extra' : 'category-balance--over'}`; 
}

const Balance = ({ plannedAmount, actualAmount, income }) => {
  const difference = plannedAmount - actualAmount;
  const className = generateBalanceClass(difference, income);
  let message;

  if (difference >= 0) {
    message = `$${getDollarString(difference)} ${income
      ? "to go"
      : "left"}`;
  } else {
    message = `$${getDollarString(difference * -1)} ${income
      ? "extra"
      : "over"}`;
  }

  return <div className={className}>{message}</div>;
};

const getActualAmount = transactions =>
  transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

const Category = ({
  edit,
  income,
  openCategory,
  category: {
    title = '',
    transactions,
    plannedAmount,
    notes = ''
  },
  updateTitle,
  updateAmount,
  updateNotes
}) => (
  <Row clickable={!edit} onClick={() => !edit && openCategory()}>
    <Title editing={edit} title={title} updateTitle={updateTitle} />
    <Amount
      editing={edit}
      actualAmount={getActualAmount(transactions)}
      plannedAmount={plannedAmount}
      updateAmount={updateAmount}
    />
    {edit ? (
      <Input
        className="category-notes-input"
        value={notes}
        placeholder="Notes"
        onChange={e => updateNotes(e.target.value)}
      />
    ) : (
      <ProgressBar
        numerator={getActualAmount(transactions)}
        denominator={plannedAmount}
        danger={!income}
      />
    )}
    <Balance
      actualAmount={getActualAmount(transactions)}
      plannedAmount={plannedAmount}
      income={income}
    />
  </Row>
);

export default Category;
