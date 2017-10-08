import React from 'react';
import ReactDOM from 'react-dom';

import Page from '../page/page';
import SubCategory from '../sub-category/sub-category';
import Category from '../category/category';

'use strict';

class Home extends React.Component {
  render() {
    return (
      <Page header={`${this.props.budget.month}/${this.props.budget.year}`}>
        {this.props.budget.expenses.map((expense, i) =>
          <Category key={i} title={expense.title} subCategories={expense.subCategories}/>)}
      </Page>
    );
  }
}

export default Home;
