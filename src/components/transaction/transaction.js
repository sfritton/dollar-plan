import React from "react";
import "./transaction.less";

import Row from "../row/row";
import Input from "../input/input";
import Button from "../button/button";

import { getCentString, getCentNumber } from "Util/currency";

const TransactionDate = ({ editing, month, day, updateDate }) => {
  if (editing) {
    return (
      <div className="transaction">
        {`${month}/ `}
        <Input
          className="transaction--date-input"
          value={day}
          onChange={e => updateDate(parseInt(e.target.value))}
        />
      </div>
    );
  }

  return <div className="transaction">{`${month}/${day}`}</div>;
};

const TransactionAmount = ({ editing, amount, updateAmount }) => {
  if (editing) {
    return (
      <Input
        className="transaction transaction--amount"
        value={getCentString(amount)}
        placeholder="0.00"
        onChange={e => updateAmount(getCentNumber(e.target.value))}
      />
    );
  }

  return (
    <div className="transaction transaction--amount">
      {`$${getCentString(amount)}`}
    </div>
  );
};

const TransactionDescription = ({
  editing,
  description,
  updateDescription
}) => {
  if (editing) {
    return (
      <Input
        className="transaction transaction--description-input"
        value={description}
        placeholder="description"
        onChange={e => updateDescription(e.target.value)}
      />
    );
  }

  return (
    <div className="transaction transaction--description">{description}</div>
  );
};

const Transaction = ({
  month,
  transaction,
  editing,
  updateDate,
  updateDescription,
  updateAmount,
  deleteTransaction
}) => (
  <Row>
    <TransactionDate
      month={month}
      day={transaction.date}
      editing={editing}
      updateDate={updateDate}
    />
    <TransactionAmount
      amount={transaction.amount}
      editing={editing}
      updateAmount={updateAmount}
    />
    <TransactionDescription
      description={transaction.description}
      editing={editing}
      updateDescription={updateDescription}
    />
    {editing && (
      <Button
        className="transaction--button"
        small
        secondary
        onClick={deleteTransaction}
      >
        Delete
      </Button>
    )}
  </Row>
);

export default Transaction;
