import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

export default class Transaction extends React.Component {
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col xs={3} md={3} lg={2}>
            {this.renderDate()}
          </Col>
          <Col xs={3} md={3} lg={2}>
            {this.renderDescription()}
          </Col>
          <Col xs={2} md={2} lg={2}>
            {this.renderAmount()}
          </Col>
        </Row>
      </Grid>
    );
  }

  renderDate() {
    return (
      <div className="sub-category-title">{this.props.transaction.date}</div>
    );
  }

  renderDescription() {
    return (
      <div className="sub-category-title">
        {this.props.transaction.description}
      </div>
    );
  }

  renderAmount() {
    return (
      <div className="sub-category-amount">
        {`$${this.props.transaction.amount.toFixed(0)}`}
      </div>
    );
  }
}
