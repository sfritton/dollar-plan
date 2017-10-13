import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

import ProgressBar from '../progress-bar/progress-bar';
import SubCategory from '../sub-category/sub-category';

'use strict';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = {open: props.defaultOpen};
  }
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
  toggleVisible() {
    this.setState(prevState => ({open: !prevState.open}));
  }
  renderSubCategories() {
    return this.props.subCategories.map((sub, i) =>
      <SubCategory key={i} title={sub.title} plannedAmount={sub.plannedAmount} actualAmount={sub.actualAmount}/>
    );
  }
  render() {
    return (
      <div>
        <Grid className="category" onClick={this.toggleVisible}>
          <Row>
            <Col xs={3} md={3}>
              <div className="category-title">{this.props.title}</div>
            </Col>
            <Col xs={3} md={2}>
              <div className="category-amount">{`$${this.getActualAmount()} of $${this.getPlannedAmount()}`}</div>
            </Col>
            <Col xs={6} md={7}>
              <ProgressBar percent={this.getActualAmount()/this.getPlannedAmount()}/>
            </Col>
          </Row>
        </Grid>
        <Panel collapsible expanded={this.state.open}>
          {this.renderSubCategories()}
        </Panel>
      </div>
    );
  }
}

export default Category;
