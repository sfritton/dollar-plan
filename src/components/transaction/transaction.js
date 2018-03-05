import React from "react";
import { Grid, Row, Col, Glyphicon } from "react-bootstrap";

import DateService from "../../services/date-service";
import TextInput from "../util/text-input";
import DollarService from "../../services/dollar-service";

export default class Transaction extends React.Component {
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col xs={2}>{this.renderDate()}</Col>
          <Col xs={this.props.edit ? 6 : 7}>{this.renderDescription()}</Col>
          <Col xs={3}>{this.renderAmount()}</Col>
          {this.renderIcon()}
        </Row>
      </Grid>
    );
  }

  renderDate() {
    const month = this.props.month;
    const day = this.props.transaction.date;

    if (this.props.edit) {
      return (
        <div>
          {`${month}/ `}
          <TextInput
            className="sub-category-input"
            value={day}
            width={"40%"}
            placeholder="25"
            onChange={e =>
              this.props.updateDate(parseInt(e.target.value))}
          />
        </div>
      );
    }

    return <div className="sub-category-title">{`${month}/${day}`}</div>;
  }

  renderDescription() {
    if (this.props.edit) {
      return (
        <TextInput
          className="sub-category-input"
          value={this.props.transaction.description}
          placeholder="description"
          onChange={e => this.props.updateDescription(e.target.value)}
        />
      );
    }

    return (
      <div className="sub-category-title">
        {this.props.transaction.description}
      </div>
    );
  }

  renderAmount() {
    if (this.props.edit) {
      return (
        <TextInput
          className="sub-category-input align-right"
          value={DollarService.getCentString(this.props.transaction.amount)}
          placeholder="0"
          onChange={e =>
            this.props.updateAmount(
              DollarService.getCentNumber(e.target.value)
            )}
        />
      );
    }

    return (
      <div className="sub-category-amount">
        {`$${DollarService.getCentString(this.props.transaction.amount)}`}
      </div>
    );
  }

  renderIcon() {
    if (!this.props.edit) {
      return null;
    }

    return (
      <Col xs={1}>
        <Glyphicon glyph="trash" onClick={this.props.deleteTransaction} />
      </Col>
    );
  }
}
