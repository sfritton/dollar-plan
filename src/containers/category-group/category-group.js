import React from "react";
import "./category-group.less";
import { connect } from "react-redux";

import {
  updateCategoryGroupTitle,
  addCategory as addCategoryAction
} from "Redux/budget/actions";
import { Row, GroupHeader } from "Components";
import Category from "../category/category";

const getActualAmount = categories =>
  Object.values(categories).reduce(
    (sum, category) =>
      sum +
      category.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    0
  );

const getPlannedAmount = categories =>
  Object.values(categories).reduce(
    (sum, category) => sum + category.plannedAmount,
    0
  );

const CategoryList = ({ categories, groupId, editing, addCategory }) => (
  <div>
    {Object.keys(categories).map(id => (
      <Category key={id} groupId={groupId} categoryId={id} />
    ))}
    {editing ? (
      <Row clickable onClick={addCategory}>
        + add a category
      </Row>
    ) : null}
  </div>
);

class CategoryGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.defaultOpen || false
    };
  }

  render() {
    const {
      editing,
      categoryGroup: { title, categories },
      groupId,
      updateTitle,
      addCategory
    } = this.props;
    const actualAmount = getActualAmount(categories);
    const plannedAmount = getPlannedAmount(categories);

    return (
      <div className="expense-group">
        <GroupHeader
          editing={editing}
          title={title}
          actualAmount={actualAmount}
          plannedAmount={plannedAmount}
          updateTitle={updateTitle}
        />
        <CategoryList
          categories={categories}
          groupId={groupId}
          editing={editing}
          addCategory={addCategory}
        />
      </div>
    );
  }

  toggleVisible() {
    if (!this.props.editing) {
      this.setState(prevState => ({ open: !prevState.open }));
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  editing: state.ui.editing,
  categoryGroup: state.budget.categoryGroups[ownProps.groupId]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTitle: title =>
    dispatch(updateCategoryGroupTitle(ownProps.groupId, title)),
  addCategory: () => dispatch(addCategoryAction(ownProps.groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGroup);
