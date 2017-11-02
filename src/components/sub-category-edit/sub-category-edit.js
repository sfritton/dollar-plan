import React from "react";
import { Grid, Row, Col, FormControl, InputGroup } from "react-bootstrap";

("use strict");

class SubCategoryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || "",
      plannedAmount: this.props.plannedAmount || 0,
      actualAmount: this.props.actualAmount || 0,
      income: this.props.income || false
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updatePlannedAmount = this.updatePlannedAmount.bind(this);
  }
  updateTitle(e) {
    this.setState({ title: e.target.value });
  }
  updatePlannedAmount(e) {
    this.setState({ plannedAmount: e.target.value });
  }
  generateMessage() {
    return (
      "$" +
      this.state.actualAmount +
      (this.state.income ? " earned so far" : " spent so far")
    );
  }
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col xs={3} md={3} lg={2}>
            <FormControl
              type="text"
              value={this.state.title}
              placeholder="Category name"
              onChange={this.updateTitle}
            />
          </Col>
          <Col xs={3} md={3} lg={2}>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
              <FormControl
                type="number"
                value={this.state.plannedAmount}
                onChange={this.updatePlannedAmount}
              />
            </InputGroup>
          </Col>
          <Col xs={3} md={3} lg={2}>
            <div className="sub-category-message">{this.generateMessage()}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SubCategoryEdit;
