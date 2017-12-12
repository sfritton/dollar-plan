import React from "react";
import { Grid, Row, Col, Glyphicon } from "react-bootstrap";

import DateService from "../../services/date-service";

export default class Transaction extends React.Component {
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col xs={2}>{this.renderDate()}</Col>
          <Col xs={6}>{this.renderDescription()}</Col>
          <Col xs={2}>{this.renderAmount()}</Col>
          <Col xs={1}>
            <Glyphicon glyph="pencil" />
          </Col>
          <Col xs={1}>
            <Glyphicon glyph="trash" onClick={this.props.deleteTransaction}/>
          </Col>
        </Row>
      </Grid>
    );
  }

  renderDate() {
    return (
      <div className="sub-category-title">
        {DateService.getMonthAndDay(this.props.transaction.date)}
      </div>
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
      <div className="sub-category-title">
        {`$${this.props.transaction.amount.toFixed(0)}`}
      </div>
    );
  }
}
