import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import ProgressBar from '../progress-bar/progress-bar';
import SubCategory from '../sub-category/sub-category';

'use strict';

class Category extends React.Component {
  getPlannedAmount() {
    return this.props.subCategories.reduce((sum, subCategory) => {
      return sum + subCategory.plannedAmount;
    }, 0);
  }
  getActualAmount() {
    return this.props.subCategories.reduce((sum, subCategory) => {
      return sum + subCategory.actualAmount;
    }, 0);
  }
  render() {
    return (
      <div>
        <Grid className="category">
          <Row>
            <Col className="height-100" xs={3} md={2}>
              <div className="category-title">{this.props.title}</div>
            </Col>
            <Col className="height-100" xs={1} md={1}>
              <div className="category-amount">{'$' + this.getPlannedAmount()}</div>
            </Col>
            <Col className="height-100" xs={8} md={9}>
              <ProgressBar percent={this.getActualAmount()/this.getPlannedAmount()}/>
            </Col>
          </Row>
        </Grid>
        {this.props.subCategories.map((sub, i) =>
          <SubCategory key={i} title={sub.title} plannedAmount={sub.plannedAmount} actualAmount={sub.actualAmount}/>
        )}
      </div>
    );
  }
}

export default Category;
