import React from "react";
import "./category.less";

import Row from "../row/row";
import GroupHeader from "../group-header/group-header";
import SubCategory from "../sub-category/sub-category";

const getActualAmount = subCategories =>
  subCategories.reduce(
    (sum, subCategory) =>
      sum +
      subCategory.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    0
  );

const getPlannedAmount = subCategories =>
  subCategories.reduce(
    (sum, subCategory) => sum + subCategory.plannedAmount,
    0
  );

const SubCategoryList = ({
  subCategories,
  editing,
  updateSubCategoryTitle,
  updateSubCategoryAmount,
  deleteSubCategory,
  openSubCategory,
  addSubCategory
}) => (
  <div>
    {subCategories.map((sub, i) => (
      <SubCategory
        key={i}
        edit={editing}
        subCategory={sub}
        updateTitle={title => updateSubCategoryTitle(i, title)}
        updateAmount={amount => updateSubCategoryAmount(i, amount)}
        deleteSubCategory={() => deleteSubCategory(i)}
        openCategory={() => openSubCategory(i)}
      />
    ))}
    {editing ? (
      <Row clickable onClick={() => addSubCategory()}>
        + add a category
      </Row>
    ) : null}
  </div>
);

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.defaultOpen || false
    };
  }

  render() {
    const {
      edit,
      category: { title, subCategories },
      updateTitle,
      updateSubCategoryTitle,
      updateSubCategoryAmount,
      deleteSubCategory,
      openSubCategory,
      addSubCategory
    } = this.props;
    const actualAmount = getActualAmount(subCategories);
    const plannedAmount = getPlannedAmount(subCategories);

    return (
      <div className="expense-group">
        <GroupHeader
          editing={edit}
          title={title}
          actualAmount={actualAmount}
          plannedAmount={plannedAmount}
          updateTitle={updateTitle}
        />
        <SubCategoryList
          subCategories={subCategories}
          editing={edit}
          updateSubCategoryTitle={updateSubCategoryTitle}
          updateSubCategoryAmount={updateSubCategoryAmount}
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
