import React from "react";
import {
  Grid,
  Row,
  Col,
  Glyphicon,
  Collapse,
  FormControl
} from "react-bootstrap";

import ProgressBar from "../progress-bar/progress-bar";
import SubCategory from "../sub-category/sub-category";

("use strict");

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisible = this.toggleVisible.bind(this);

    this.state = {
      open: props.defaultOpen || false
    };
  }
  render() {
    return (
      <div>
        <Grid className="category" onClick={this.toggleVisible}>
          <Row>
            <Col xs={3} md={3} lg={2}>
              {this.renderTitle()}
            </Col>
            <Col xs={3} md={2} lg={2}>
              <div className="category-amount">
                {`$${this.getActualAmount()} of $${this.getPlannedAmount()}`}
              </div>
            </Col>
            <Col xs={5} md={6} lg={7}>
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
        <FormControl
          type="text"
          value={this.props.title}
          placeholder="Category name"
          //onChange={() => {this.props.updateTitle()}}
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
            edit={this.props.edit}
            plannedAmount={sub.plannedAmount}
            actualAmount={sub.actualAmount}
            deleteSubCategory={id => {
              this.props.deleteSubCategory(this.props.id, id);
            }}
          />
        ))}
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
