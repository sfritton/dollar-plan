import React from 'react';

import Page from '../page/page';
import SubCategory from '../sub-category/sub-category';
import Category from '../category/category';

'use strict';

class Home extends React.Component {
  getMonthName() {
    switch (this.props.budget.month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return 'Frittembruary';
    }
  }
  render() {
    return (
      <Page header={`${this.getMonthName()} ${this.props.budget.year}`}>
        <div className='section-header'>Income</div>
        {this.props.budget.incomes.map((income, i) =>
          <SubCategory key={i}
                       title={income.title}
                       income={true}
                       plannedAmount={income.plannedAmount}
                       actualAmount={income.actualAmount}/>)}
        <div className='section-header'>Expenses</div>
        {this.props.budget.expenses.map((expense, i) =>
          <Category key={i}
                    title={expense.title}
                    income={false}
                    defaultOpen={true}
                    subCategories={expense.subCategories}/>)}
      </Page>
    );
  }
}

export default Home;
