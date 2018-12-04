import React from "react";
import "./category-group.less";

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

const CategoryList = ({
  categories,
  editing,
  updateSubCategoryTitle,
  updateSubCategoryAmount,
  updateSubCategoryNotes,
  deleteSubCategory,
  openSubCategory,
  addSubCategory
}) => (
  <div>
    {Object.entries(categories).map(([id, category]) => (
      <Category
        key={id}
        edit={editing}
        category={category}
        updateTitle={title => updateSubCategoryTitle(id, title)}
        updateAmount={amount => updateSubCategoryAmount(id, amount)}
        updateNotes={notes => updateSubCategoryNotes(id, notes)}
        deleteSubCategory={() => deleteSubCategory(id)}
        openCategory={() => openSubCategory(id)}
      />
    ))}
    {editing ? (
      <Row clickable onClick={() => addSubCategory()}>
        + add a category
      </Row>
    ) : null}
  </div>
);

export default class CategoryGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.defaultOpen || false
    };
  }

  render() {
    const {
      edit,
      categoryGroup: { title, categories },
      updateTitle,
      updateSubCategoryTitle,
      updateSubCategoryAmount,
      updateSubCategoryNotes,
      deleteSubCategory,
      openSubCategory,
      addSubCategory
    } = this.props;
    const actualAmount = getActualAmount(categories);
    const plannedAmount = getPlannedAmount(categories);

    return (
      <div className="expense-group">
        <GroupHeader
          editing={edit}
          title={title}
          actualAmount={actualAmount}
          plannedAmount={plannedAmount}
          updateTitle={updateTitle}
        />
        <CategoryList
          categories={categories}
          editing={edit}
          updateSubCategoryTitle={updateSubCategoryTitle}
          updateSubCategoryAmount={updateSubCategoryAmount}
          updateSubCategoryNotes={updateSubCategoryNotes}
          deleteSubCategory={deleteSubCategory}
          openSubCategory={openSubCategory}
          addSubCategory={addSubCategory}
        />
      </div>
    );
  }

  toggleVisible() {
    if (!this.props.edit) {
      this.setState(prevState => ({ open: !prevState.open }));
    }
  }
}
