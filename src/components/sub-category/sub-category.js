import React from "react";
import {
  Grid,
  Row,
  Col,
  FormControl,
  InputGroup,
  Glyphicon
} from "react-bootstrap";

import ProgressBar from "../progress-bar/progress-bar";

("use strict");

class SubCategory extends React.Component {
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col xs={3} md={3} lg={2}>
            {this.renderTitle()}
          </Col>
          <Col xs={3} md={2} lg={2}>
            {this.renderAmount()}
          </Col>
          <Col xs={2} md={4} lg={5}>
            <ProgressBar
              income={this.props.income}
              percent={this.props.actualAmount / this.props.plannedAmount}
            />
          </Col>
          <Col xs={3} md={2} lg={2}>
            <div className="sub-category-message">{this.generateMessage()}</div>
          </Col>
          <Col xs={1} md={1} lg={1}>
            {this.renderIcon()}
          </Col>
        </Row>
      </Grid>
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

    return <div className="sub-category-title">{this.props.title}</div>;
  }
  renderAmount() {
    if (this.props.edit) {
      return (
        <InputGroup>
          <InputGroup.Addon>${this.props.actualAmount} of $</InputGroup.Addon>
          <FormControl
            type="number"
            value={this.props.plannedAmount}
            //onChange={() => {this.props.updatePlannedAmount()}}
          />
        </InputGroup>
      );
    }

    return (
      <div className="sub-category-amount">
        {`$${this.props.actualAmount} of $${this.props.plannedAmount}`}
      </div>
    );
  }
  generateMessage() {
    if (this.props.actualAmount <= this.props.plannedAmount) {
      return (
        "$" +
        (this.props.plannedAmount - this.props.actualAmount) +
        (this.props.income ? " to go" : " left")
      );
    }

    return (
      "$" +
      (this.props.actualAmount - this.props.plannedAmount) +
      (this.props.income ? " extra" : " over")
    );
  }
  renderIcon() {
    if (this.props.edit) {
      return (
        <Glyphicon
          className="icon-btn"
          glyph="trash"
          onClick={() => {
            this.props.deleteSubCategory(this.props.id);
          }}
        />
      );
    }
    return;
  }
}

export default SubCategory;
