import React from "react";
import "./category.less";
import { connect } from "react-redux";

import {
  updateCategoryTitle,
  updateCategoryAmount,
  updateCategoryNotes
} from "Redux/budget/actions";
import { setActiveCategory } from "Redux/category/actions";
import { setCategoryPage } from "Redux/ui/actions";
import { Card, ProgressBar, Input } from "Components";
import { getCentString, getCentNumber, getDollarString } from "Util/currency";

const Title = ({ editing, title, updateTitle }) => (
  <div className="category-title">
    {editing ? (
      <Input
        className="category-title-input"
        value={title}
        placeholder="Category name"
        onChange={e => updateTitle(e.target.value)}
      />
    ) : (
      title
    )}
  </div>
);

const getBalanceMessage = (difference, income) => {
  if (difference >= 0) {
    return `$${getDollarString(difference)} ${income ? "to go" : "left"}`;
  }

  return `$${getDollarString(difference * -1)} ${income ? "extra" : "over"}`;
};

export const Balance = ({ plannedAmount, actualAmount, income }) => {
  if (plannedAmount === 0 && actualAmount === 0) return null;

  const difference = plannedAmount - actualAmount;
  const message = getBalanceMessage(difference, income);

  return <div className="category-balance">{message}</div>;
};

const Amount = ({ editing, plannedAmount, updateAmount }) => (
  <div className="category-amount">
    {editing ? (
      <Input
        className="category-amount-input"
        value={getCentString(plannedAmount)}
        placeholder="0"
        onChange={e => updateAmount(getCentNumber(e.target.value))}
      />
    ) : (
      `$${getDollarString(plannedAmount)}`
    )}
  </div>
);

const Notes = ({ notes = "", editing = false, updateNotes }) => {
  if (!editing && !notes) return null;

  return (
    <div className="category-card--notes">
      {editing ? (
        <Input
          className="category-notes-input"
          value={notes}
          placeholder="Notes"
          onChange={e => updateNotes(e.target.value)}
        />
      ) : (
        notes
      )}
    </div>
  );
};

const getActualAmount = transactions =>
  transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

const Category = ({
  editing,
  income,
  category: { title = "", transactions, plannedAmount, notes = "" },
  actualAmount,
  openCategory,
  updateTitle,
  updateAmount,
  updateNotes
}) => (
  <Card clickable={!editing} onClick={() => !editing && openCategory()}>
    <div
      className={`category-card--header ${editing
        ? "category-card--header--editing"
        : ""}`}
    >
      <Title editing={editing} title={title} updateTitle={updateTitle} />
      <Amount
        editing={editing}
        plannedAmount={plannedAmount}
        updateAmount={updateAmount}
      />
    </div>
    <div className="category-card--footer">
      <Balance
        plannedAmount={plannedAmount}
        actualAmount={actualAmount}
        income={income}
      />
      <ProgressBar
        numerator={actualAmount}
        denominator={plannedAmount}
        danger={!income}
      />
    </div>
    <Notes notes={notes} updateNotes={updateNotes} editing={editing} />
  </Card>
);
const mapStateToProps = (state, ownProps) => {
  const category =
    state.budget.categoryGroups[ownProps.groupId].categories[
      ownProps.categoryId
    ];

  return {
    editing: state.ui.editing,
    category,
    actualAmount: getActualAmount(category.transactions)
  };
};

const mapDispatchToProps = (dispatch, { groupId, categoryId }) => ({
  updateTitle: title =>
    dispatch(updateCategoryTitle(groupId, categoryId, title)),
  updateAmount: amount =>
    dispatch(updateCategoryAmount(groupId, categoryId, amount)),
  updateNotes: notes =>
    dispatch(updateCategoryNotes(groupId, categoryId, notes)),
  openCategory: () => {
    dispatch(setActiveCategory(groupId, categoryId));
    dispatch(setCategoryPage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
