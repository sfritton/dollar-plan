import React from "react";
import { Grid, Row, Col, Glyphicon } from "react-bootstrap";

import ProgressBar from "../util/progress-bar";
import TextInput from "../util/text-input";

("use strict");

class SubCategory extends React.Component {
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col xs={3} md={3} lg={2}>
            {this.renderTitle()}
          </Col>
          <Col xs={2} md={this.props.edit ? 3 : 2} lg={this.props.edit ? 3 : 2}>
            {this.renderAmount()}
          </Col>
          <Col xs={2} md={this.props.edit ? 3 : 4} lg={this.props.edit ? 4 : 5}>
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
        <TextInput
          className="sub-category-input"
          value={this.props.title}
          placeholder="Category name"
          onChange={e => this.props.updateTitle(e.target.value)}
        />
      );
    }

    return <div className="sub-category-title">{this.props.title}</div>;
  }
  renderAmount() {
    if (this.props.edit) {
      return (
        <div style={{ textAlign: "right" }}>
          {`$${this.props.actualAmount} of `}
          <TextInput
            className="sub-category-input dollar"
            width="50%"
            value={this.props.plannedAmount}
            placeholder="0"
            onChange={e => this.props.updateAmount(e.target.value)}
          />
        </div>
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
            this.props.deleteSubCategory();
          }}
        />
      );
    }
  }
}

export default SubCategory;
