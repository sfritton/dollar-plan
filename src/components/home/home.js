import React from 'react';
import ReactDOM from 'react-dom';

import Page from '../page/page';
import SubCategory from '../sub-category/sub-category';
import Category from '../category/category';

'use strict';

class Home extends React.Component {
  render() {
    return (
      <Page header={'November 2017, 15 days left'}>
        <Category title='Expenses' subCategories={Home.subCategories}/>
      </Page>
    );
  }
}

Home.subCategories = [
  {title: 'Groceries', plannedAmount: 230,  actualAmount: 100},
  {title: 'Rent',      plannedAmount: 1320, actualAmount: 1320},
  {title: 'Treats',    plannedAmount: 80,   actualAmount: 100},
  {title: 'Clothing',  plannedAmount: 60,   actualAmount: 10}
]

export default Home;
