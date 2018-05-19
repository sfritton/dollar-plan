import React from "react";
import "./category.less";

import Row from "../row/row";
import ProgressBar from "../progress-bar/progress-bar";
import SubCategory from "../sub-category/sub-category";
import CategoryButton from "../util/category-button";
import Input from "../input/input";
import DollarService from "../../services/dollar-service";

const getActualAmount = subCategories => subCategories.reduce(
  (sum, subCategory) =>
    sum + subCategory.transactions.reduce(
      (sum, transaction) => sum + transaction.amount, 0),
  0
);

const getPlannedAmount = subCategories => subCategories.reduce(
  (sum, subCategory) => sum + subCategory.plannedAmount, 0
);

const CategoryTitle = ({ editing, title, updateTitle }) => {
  if (editing) {
    return (
      <Input
        className="category-input"
        value={title}
        placeholder="Category name"
        onChange={e => updateTitle(e.target.value)}
      />
    );
  }

  return <div className="category-title"><h3>{title}</h3></div>
};

const CategoryAmount = ({ actualAmount, plannedAmount }) => {
  const actualAmountStr = DollarService.getDollarString(actualAmount);
  const plannedAmountStr = DollarService.getDollarString(plannedAmount);

  return (
    <div className="category-amount">
      <h3>
        {`$${actualAmountStr} of $${plannedAmountStr}`}
      </h3>
    </div>
  );
};

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
      <CategoryButton
        subCategory
        onClick={() => addSubCategory()}
      >
        Add a category
      </CategoryButton>
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
        <Row focusable header>
          <CategoryTitle
            editing={edit}
            title={title}
            updateTitle={updateTitle}
          />
          <CategoryAmount
            actualAmount={actualAmount}
            plannedAmount={plannedAmount}
          />
          <ProgressBar
            numerator={actualAmount}
            denominator={plannedAmount}
            danger
          />
        </Row>
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
