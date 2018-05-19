import React from "react";
import "./sub-category.less";

import Row from "../row/row";
import ProgressBar from "../progress-bar/progress-bar";
import Input from "../input/input";
import DollarService from "../../services/dollar-service";

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
        {`$${DollarService.getCentString(actualAmount)} of `}
        <Input
          className="category-amount-input"
          value={DollarService.getCentString(plannedAmount)}
          placeholder="0"
          onChange={e =>
            updateAmount(DollarService.getCentNumber(e.target.value))}
        />
      </div>
    );
  }

  return (
    <div className="category-amount">
      {`$${DollarService.getDollarString(
        actualAmount
      )} of $${DollarService.getDollarString(plannedAmount)}`}
    </div>
  );
};

const Balance = ({ plannedAmount, actualAmount, income }) => {
  const difference = plannedAmount - actualAmount;
  let message;

  if (difference >= 0) {
    message = `$${DollarService.getDollarString(difference)} ${income
      ? "to go"
      : "left"}`;
  } else {
    message = `$${DollarService.getDollarString(difference * -1)} ${income
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
  <Row focusable={!edit} onClick={() => !edit && openCategory()}>
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
