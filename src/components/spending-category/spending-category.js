import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import ProgressBar from '../progress-bar/progress-bar';

'use strict';

class SpendingCategory extends React.Component {
  render() {
    return (
      <Grid className="category">
        <Row>
          <Col className="height-100" xs={3}>
            <div className="category-title">{this.props.title}</div>
          </Col>
          <Col className="height-100" xs={1}>
            <div className="category-amount">{'$' + this.props.plannedAmount}</div>
          </Col>
          <Col className="height-100" xs={4}>
            <ProgressBar percent={this.props.actualAmount/this.props.plannedAmount}/>
          </Col>
          <Col className="height-100" xs={4}>
            <div className="category-message">{'$' + this.props.actualAmount + ' spent so far'}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SpendingCategory;
