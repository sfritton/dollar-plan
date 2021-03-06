import React from "react";
import { connect } from "react-redux";

import { Page, Row, GroupHeader, Footer, Transaction } from "Components";
import Header from "../header/header";
import { setBudgetPage, setEditing } from "Redux/ui/actions";
import * as CategoryActions from "Redux/category/actions";
import { saveCategoryToBudget, saveBudget } from "Redux/budget/actions";

class CategoryPage extends React.Component {
  render() {
    const {
      groupTitle,
      category: { title, plannedAmount, notes },
      income,
      addTransaction
    } = this.props;

    return (
      <Page header={<Header />} footer={this.renderFooter()}>
        <section>
          <h2>{groupTitle}</h2>
          <GroupHeader
            title={title}
            actualAmount={this.getActualAmount()}
            plannedAmount={plannedAmount}
            income={income}
          />
          {notes && (
            <Row>
              <b>Notes:</b> {notes}
            </Row>
          )}
          {this.renderTransactions()}
          <Row clickable onClick={addTransaction}>
            + Add a transaction
          </Row>
        </section>
      </Page>
    );
  }

  getActualAmount() {
    return this.props.category.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }

  renderFooter() {
    const {
      editing,
      editTransactions,
      saveTransactions,
      goToBudget,
      reset
    } = this.props;

    return (
      <Footer
        editing={editing}
        primaryDefault={{
          label: "Edit transactions",
          onClick: editTransactions
        }}
        primaryEditing={{
          label: "Save transactions",
          onClick: saveTransactions
        }}
        secondaryDefault={{ label: "Back to budget", onClick: goToBudget }}
        secondaryEditing={{ label: "Cancel", onClick: reset }}
      />
    );
  }

  renderTransactions() {
    const {
      category: { transactions },
      month,
      editing,
      updateTransactionDate,
      updateTransactionDescription,
      updateTransactionAmount,
      deleteTransaction
    } = this.props;

    return transactions.map(transaction => (
      <Transaction
        key={transaction.id}
        month={month}
        transaction={transaction}
        editing={editing}
        updateDate={date => updateTransactionDate(date, transaction.id)}
        updateDescription={desc =>
          updateTransactionDescription(desc, transaction.id)}
        updateAmount={amount => updateTransactionAmount(amount, transaction.id)}
        deleteTransaction={() => deleteTransaction(transaction.id)}
      />
    ));
  }
}

const mapStateToProps = state => ({
  month: state.budget.date.month,
  category: state.category,
  editing: state.ui.editing,
  income: state.category.groupId === "income",
  groupTitle: state.budget.categoryGroups[state.category.groupId].title
});

const mapDispatchToProps = dispatch => ({
  updateTransactionDate: (date, id) =>
    dispatch(CategoryActions.updateTransactionDate(date, id)),
  updateTransactionDescription: (desc, id) =>
    dispatch(CategoryActions.updateTransactionDescription(desc, id)),
  updateTransactionAmount: (amount, id) =>
    dispatch(CategoryActions.updateTransactionAmount(amount, id)),
  deleteTransaction: id => dispatch(CategoryActions.deleteTransaction(id)),
  addTransaction: () => {
    dispatch(CategoryActions.addTransaction());
    dispatch(setEditing(true));
  },
  editTransactions: () => dispatch(setEditing(true)),
  saveTransactions: () => {
    dispatch(setEditing(false));
    dispatch(saveCategoryToBudget());
    dispatch(saveBudget());
  },
  goToBudget: () => dispatch(setBudgetPage()),
  reset: () => {
    dispatch(CategoryActions.resetCategory());
    dispatch(setEditing(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
