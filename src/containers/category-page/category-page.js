import React from "react";
import { connect } from "react-redux";

import { Page, Row, GroupHeader, Footer, Transaction } from "Components";
import Header from "../header/header";
import { setPage, setEdit } from "Redux/actions/ui-actions";
import * as CategoryActions from "Redux/actions/category-actions";
import { saveBudget } from "Redux/budget/actions";
import Pages from "Redux/actions/pages-enum";

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
          <Row
            clickable
            onClick={addTransaction}
          >
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
        primaryDefault={{ label: 'Edit transactions', onClick: editTransactions }}
        primaryEditing={{ label: 'Save transactions', onClick: saveTransactions }}
        secondaryDefault={{ label: 'Back to budget', onClick: goToBudget }}
        secondaryEditing={{ label: 'Cancel', onClick: reset }}
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

    return transactions.map((transaction, i) => (
      <Transaction
        key={i}
        month={month}
        transaction={transaction}
        edit={editing}
        updateDate={date => updateTransactionDate(date, i)}
        updateDescription={desc => updateTransactionDescription(desc, i)}
        updateAmount={amount => updateTransactionAmount(amount, i)}
        deleteTransaction={deleteTransaction}
      />
    ));
  }
}

const mapStateToProps = state => ({
  month: state.budget.date.month,
  category: state.category,
  editing: state.ui.edit,
  income: state.category.groupId === "income",
  groupTitle: state.budget.categoryGroups[state.category.groupId].title,
});

const mapDispatchToProps = dispatch => ({
  updateTransactionDate: (date, i) => dispatch(CategoryActions.updateTransactionDate(date, i)),
  updateTransactionDescription: (desc, i) => dispatch(CategoryActions.updateTransactionDescription(desc, i)),
  updateTransactionAmount: (amount, i) => dispatch(CategoryActions.updateTransactionAmount(amount, i)),
  deleteTransaction: i => {
    dispatch(CategoryActions.deleteTransaction(i));
    dispatch(setEdit(true));
  },
  addTransaction: () => {
    dispatch(CategoryActions.addTransaction());
    dispatch(setEdit(true));
  },
  editTransactions: () => dispatch(setEdit(true)),
  saveTransactions: () => {
    dispatch(setEdit(false));
    dispatch(CategoryActions.saveCategoryToBudget());
    dispatch(saveBudget());
  },
  goToBudget: () => dispatch(setPage(Pages.BUDGET)),
  reset: () => {
    dispatch(CategoryActions.resetCategory());
    dispatch(setEdit(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
