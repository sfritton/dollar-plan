import React from "react";
import "./sub-category.less";

import Row from "../row/row";
import ProgressBar from "../progress-bar/progress-bar";
import Input from "../input/input";
import { getCentString, getCentNumber, getDollarString } from "../../services/dollar-service";

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

const Balance = ({ plannedAmount, actualAmount, income }) => {
  const difference = plannedAmount - actualAmount;
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

  return <div className="category-balance">{message}</div>;
};

const getActualAmount = transactions =>
  transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

const SubCategory = ({
  edit,
  income,
  openCategory,
  subCategory,
  updateTitle,
  updateAmount
}) => (
  <Row clickable={!edit} onClick={() => !edit && openCategory()}>
    <Title editing={edit} title={subCategory.title} updateTitle={updateTitle} />
    <Amount
      editing={edit}
      actualAmount={getActualAmount(subCategory.transactions)}
      plannedAmount={subCategory.plannedAmount}
      updateAmount={updateAmount}
    />
    <ProgressBar
      numerator={getActualAmount(subCategory.transactions)}
      denominator={subCategory.plannedAmount}
      danger={!income}
    />
    <Balance
      actualAmount={getActualAmount(subCategory.transactions)}
      plannedAmount={subCategory.plannedAmount}
      income={income}
    />
  </Row>
);

export default SubCategory;
