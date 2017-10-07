import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import ProgressBar from '../progress-bar/progress-bar';

'use strict';

class SpendingCategory extends React.Component {
  generateMessage() {
    if (this.props.actualAmount < this.props.plannedAmount) {
      return `$${this.props.plannedAmount - this.props.actualAmount} left to spend`;
    }

    if (this.props.actualAmount == this.props.plannedAmount) {
      return 'nothing left to spend';
    }

    return `$${this.props.actualAmount - this.props.plannedAmount} overbudget!`;
  }
  render() {
    return (
      <Grid className="category">
        <Row>
          <Col className="height-100" xs={3} md={2}>
            <div className="category-title">{this.props.title}</div>
          </Col>
          <Col className="height-100" xs={1} md={1}>
            <div className="category-amount">{'$' + this.props.plannedAmount}</div>
          </Col>
          <Col className="height-100" xs={4} md={6}>
            <ProgressBar percent={this.props.actualAmount/this.props.plannedAmount}/>
          </Col>
          <Col className="height-100" xs={4} md={3}>
            <div className="category-message">{this.generateMessage()}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SpendingCategory;
