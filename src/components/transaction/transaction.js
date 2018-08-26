import React from "react";
import "./transaction.less";

import Row from '../row/row';
import Input from "../input/input";
import Button from "../button/button";

import DollarService from "../../services/dollar-service";

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
}

const TransactionAmount = ({ editing, amount, updateAmount }) => {
  if (editing) {
    return (
      <Input
        className="transaction transaction--amount"
        value={DollarService.getCentString(amount)}
        placeholder="0.00"
        onChange={e => updateAmount(DollarService.getCentNumber(e.target.value))}
      />
    );
  }

  return (
    <div className="transaction transaction--amount">
      {`$${DollarService.getCentString(amount)}`}
    </div>
  );
}

const TransactionDescription = ({ editing, description, updateDescription }) => {
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
    <div className="transaction transaction--description">
      {description}
    </div>
  );
}

const Transaction = ({
  month,
  transaction,
  edit,
  updateDate,
  updateDescription,
  updateAmount,
  deleteTransaction
}) => (
  <Row>
    <TransactionDate
      month={month}
      day={transaction.date}
      editing={edit}
      updateDate={updateDate}
    />
    <TransactionAmount
      amount={transaction.amount}
      editing={edit}
      updateAmount={updateAmount}
    />
    <TransactionDescription
      description={transaction.description}
      editing={edit}
      updateDescription={updateDescription}
    />
    {edit &&
      <Button
        className="transaction--button"
        small
        secondary
        onClick={deleteTransaction}
      >
        Delete
      </Button>
    }
  </Row>
);

export default Transaction;
