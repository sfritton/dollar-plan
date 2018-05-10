import React from "react";
import "./category.less";

import Row from "../row/row";
import ProgressBar from "../progress-bar/progress-bar";
import SubCategory from "../sub-category/sub-category";
import CategoryButton from "../util/category-button";
import TextInput from "../util/text-input";
import DollarService from "../../services/dollar-service";

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.defaultOpen || false
    };
  }
  render() {
    return (
      <div className="expense-group">
        <Row focusable header>
          <div className="category-title">
            <h3>{this.props.category.title}</h3>
          </div>
          <div className="category-amount">
            <h3>
              {`$${DollarService.getDollarString(
                this.getActualAmount()
              )} of $${DollarService.getDollarString(
                this.getPlannedAmount()
              )}`}
            </h3>
          </div>
          <ProgressBar
            numerator={this.getActualAmount()}
            denominator={this.getPlannedAmount()}
            danger
          />
        </Row>
        {this.renderSubCategories()}
      </div>
    );
  }
  renderTitle() {
    if (this.props.edit) {
      return (
        <TextInput
          className="category-input"
          value={this.props.category.title}
          placeholder="Category name"
          onChange={e => this.props.updateTitle(e.target.value)}
        />
      );
    }
    return <div className="category-title">{this.props.category.title}</div>;
  }
  getActualAmount() {
    return this.props.category.subCategories.reduce(
      (sum, subCategory) =>
        sum +
        subCategory.transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ),
      0
    );
  }
  getPlannedAmount() {
    return this.props.category.subCategories.reduce(
      (sum, subCategory) => sum + subCategory.plannedAmount,
      0
    );
  }
  renderSubCategories() {
    return (
      <div>
        {this.props.category.subCategories.map((sub, i) => (
          <SubCategory
            key={i}
            edit={this.props.edit}
            subCategory={sub}
            updateTitle={title => this.props.updateSubCategoryTitle(i, title)}
            updateAmount={amount =>
              this.props.updateSubCategoryAmount(i, amount)}
            deleteSubCategory={() => this.props.deleteSubCategory(i)}
            openCategory={() => this.props.openSubCategory(i)}
          />
        ))}
        {this.props.edit ? (
          <CategoryButton
            subCategory
            onClick={() => this.props.addSubCategory()}
          >
            Add a category
          </CategoryButton>
        ) : null}
      </div>
    );
  }
  toggleVisible() {
    if (!this.props.edit) {
      this.setState(prevState => ({ open: !prevState.open }));
    }
  }
}
