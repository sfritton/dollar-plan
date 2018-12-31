import React from "react";
import "./category.less";
import { connect } from "react-redux";

import {
  updateCategoryTitle,
  updateCategoryAmount,
  updateCategoryNotes,
  deleteIncomeCategory
} from "Redux/budget/actions";
import { setActiveCategory } from "Redux/category/actions";
import * as UIActions from "Redux/actions/ui-actions";
import Pages from "Redux/actions/pages-enum";
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

  return <span className={className}>({message})</span>;
};

const Amount = ({ editing, actualAmount, plannedAmount, income, updateAmount }) => {
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
      )} of ${getDollarString(plannedAmount)}`}
      <Balance
        plannedAmount={plannedAmount}
        actualAmount={actualAmount}
        income={income}
      />
    </div>
  );
};

const getActualAmount = transactions =>
  transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

const Category = ({
  editing,
  income,
  category,
  category: {
    title = '',
    transactions,
    plannedAmount,
    notes = ''
  },
  openCategory,
  updateTitle,
  updateAmount,
  updateNotes
}) => (
  <Row clickable={!editing} onClick={() => !editing && openCategory()}>
    <Title editing={editing} title={title} updateTitle={updateTitle} />
    <Amount
      editing={editing}
      actualAmount={getActualAmount(transactions)}
      plannedAmount={plannedAmount}
      updateAmount={updateAmount}
      income={income}
    />
    {editing ? (
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
  </Row>
);

const mapStateToProps = (state, ownProps) => ({
  editing: state.ui.edit,
  category: state.budget.categoryGroups[ownProps.groupId].categories[ownProps.categoryId]
});

const mapDispatchToProps = (dispatch, { groupId, categoryId }) => ({
  updateTitle: title =>
    dispatch(updateCategoryTitle(groupId, categoryId, title)),
  updateAmount: amount =>
    dispatch(updateCategoryAmount(groupId, categoryId, amount)),
  updateNotes: notes =>
    dispatch(updateCategoryNotes(groupId, categoryId, notes)),
  deleteSubCategory: () =>
    dispatch(deleteIncomeCategory(categoryId)),
  openCategory: () => {
    dispatch(setActiveCategory(groupId, categoryId));
    dispatch(UIActions.setPage(Pages.CATEGORY));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
