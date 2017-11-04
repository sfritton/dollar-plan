import React from "react";
import { Grid, Row, Col, FormControl, InputGroup } from "react-bootstrap";

import ProgressBar from "../progress-bar/progress-bar";

("use strict");

class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      plannedAmount: props.plannedAmount || 0,
      actualAmount: props.actualAmount || 0
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updatePlannedAmount = this.updatePlannedAmount.bind(this);
  }
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
          <Col xs={3} md={5} lg={6}>
            <ProgressBar
              income={this.props.income}
              percent={this.state.actualAmount / this.state.plannedAmount}
            />
          </Col>
          <Col xs={3} md={2} lg={2}>
            <div className="sub-category-message">{this.generateMessage()}</div>
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
          value={this.state.title}
          placeholder="Category name"
          onChange={this.updateTitle}
        />
      );
    }

    return <div className="sub-category-title">{this.state.title}</div>;
  }
  renderAmount() {
    if (this.props.edit) {
      return (
        <InputGroup>
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl
            type="number"
            value={this.state.plannedAmount}
            onChange={this.updatePlannedAmount}
          />
        </InputGroup>
      );
    }

    return (
      <div className="sub-category-amount">
        {`$${this.state.actualAmount} of $${this.state.plannedAmount}`}
      </div>
    );
  }
  generateMessage() {
    if (this.state.actualAmount <= this.state.plannedAmount) {
      return (
        "$" +
        (this.state.plannedAmount - this.state.actualAmount) +
        (this.props.income ? " to go" : " left")
      );
    }

    return (
      "$" +
      (this.state.actualAmount - this.state.plannedAmount) +
      (this.props.income ? " extra" : " over")
    );
  }
  updateTitle(e) {
    this.setState({ title: e.target.value });
  }
  updatePlannedAmount(e) {
    this.setState({ plannedAmount: e.target.value });
  }
}

export default SubCategory;
