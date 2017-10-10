import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import ProgressBar from '../progress-bar/progress-bar';

'use strict';

class SubCategory extends React.Component {
  generateMessage() {
    if (this.props.actualAmount <= this.props.plannedAmount) {
      return `$${this.props.plannedAmount - this.props.actualAmount} left`;
    }

    return `$${this.props.actualAmount - this.props.plannedAmount} over`;
  }
  render() {
    return (
      <Grid className="sub-category">
        <Row>
          <Col className="height-100" xs={3} md={3}>
            <div className="sub-category-title">{this.props.title}</div>
          </Col>
          <Col className="height-100" xs={3} md={2}>
            <div className="sub-category-amount">{`$${this.props.actualAmount} of $${this.props.plannedAmount}`}</div>
          </Col>
          <Col className="height-100" xs={3} md={5}>
            <ProgressBar percent={this.props.actualAmount/this.props.plannedAmount}/>
          </Col>
          <Col className="height-100" xs={3} md={2}>
            <div className="sub-category-message">{this.generateMessage()}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SubCategory;
