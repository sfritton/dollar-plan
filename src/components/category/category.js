import React from "react";
import { Grid, Row, Col, Glyphicon, Collapse } from "react-bootstrap";

import ProgressBar from "../util/progress-bar";
import SubCategory from "../sub-category/sub-category";
import CategoryButton from "../util/category-button";
import TextInput from "../util/text-input";

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.defaultOpen || false
    };
  }
  render() {
    return (
      <div className="category-wrapper">
        <Grid className="category" onClick={() => this.toggleVisible()}>
          <Row>
            <Col
              xs={3}
              md={this.props.edit ? 4 : 3}
              lg={this.props.edit ? 3 : 2}
            >
              {this.renderTitle()}
            </Col>
            <Col xs={3} md={2} lg={2}>
              <div className="category-amount">
                {`$${this.getActualAmount().toFixed(
                  0
                )} of $${this.getPlannedAmount().toFixed(0)}`}
              </div>
            </Col>
            <Col
              xs={5}
              md={this.props.edit ? 5 : 6}
              lg={this.props.edit ? 6 : 7}
            >
              <ProgressBar
                percent={this.getActualAmount() / this.getPlannedAmount()}
              />
            </Col>
            <Col xs={1} md={1} lg={1}>
              {this.renderIcon()}
            </Col>
          </Row>
        </Grid>
        <Collapse in={this.props.edit || this.state.open}>
          {this.renderSubCategories()}
        </Collapse>
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
  renderIcon() {
    if (this.props.edit) {
      return (
        <Glyphicon glyph="trash" onClick={() => this.props.deleteCategory()} />
      );
    }
    return (
      <Glyphicon
        className={"chevron chevron-" + (this.state.open ? "open" : "closed")}
        glyph="chevron-down"
      />
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
            openCategory={() => console.log("not implemented")}
          />
        ))}
        {this.props.edit ? (
          <CategoryButton
            subCategory
            onClick={() => this.props.addSubCategory()}
          >
            <Glyphicon glyph="plus" /> Add a category
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
