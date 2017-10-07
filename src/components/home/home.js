import React from 'react';
import ReactDOM from 'react-dom';

import Page from '../page/page';
import SpendingCategory from '../spending-category/spending-category';

'use strict';

class Home extends React.Component {
  render() {
    return (
      <Page header={'November 2017, 15 days left'}>
        <SpendingCategory title={'Groceries'} plannedAmount={230} actualAmount={100}/>
        <SpendingCategory title={'Rent'} plannedAmount={1320} actualAmount={1320}/>
        <SpendingCategory title={'Treats'} plannedAmount={80} actualAmount={100}/>
        <SpendingCategory title={'Clothing'} plannedAmount={60} actualAmount={10}/>
      </Page>
    );
  }
}

export default Home;
