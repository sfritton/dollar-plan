import React from "react";
import { Grid, Row, Col, Glyphicon, Collapse } from "react-bootstrap";

import ProgressBar from "../progress-bar/progress-bar";
import SubCategory from "../sub-category/sub-category";
import CategoryButton from "../util/category-button";
import TextInput from "../forms/text-input";

("use strict");

class Category extends React.Component {
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
                {`$${this.getActualAmount()} of $${this.getPlannedAmount()}`}
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
          value={this.props.title}
          placeholder="Category name"
          onChange={e => {
            this.props.updateTitle(this.props.id, e.target.value);
          }}
        />
      );
    }
    return <div className="category-title">{this.props.title}</div>;
  }
  getActualAmount() {
    return this.props.subCategories.reduce((sum, subCategory) => {
      return sum + subCategory.actualAmount;
    }, 0);
  }
  getPlannedAmount() {
    return this.props.subCategories.reduce((sum, subCategory) => {
      return sum + subCategory.plannedAmount;
    }, 0);
  }
  renderIcon() {
    if (this.props.edit) {
      return (
        <Glyphicon
          glyph="trash"
          onClick={() => {
            this.props.deleteCategory(this.props.id);
          }}
        />
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
        {this.props.subCategories.map((sub, i) => (
          <SubCategory
            key={i}
            id={i}
            title={sub.title}
            updateTitle={(id, title) =>
              this.props.updateSubCategoryTitle(this.props.id, id, title)}
            edit={this.props.edit}
            plannedAmount={sub.plannedAmount}
            updateAmount={(id, amount) =>
              this.props.updateSubCategoryAmount(this.props.id, id, amount)}
            actualAmount={sub.actualAmount}
            deleteSubCategory={id => {
              this.props.deleteSubCategory(this.props.id, id);
            }}
          />
        ))}
        {this.props.edit ? (
          <CategoryButton
            subCategory
            onClick={() => {
              this.props.addSubCategory(this.props.id);
            }}
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

export default Category;
