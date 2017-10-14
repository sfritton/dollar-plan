import React from 'react'; // eslint-disable-line no-unused-vars
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import SubCategory from './sub-category';
import ProgressBar from '../progress-bar/progress-bar';

describe('SubCategory', function() {
  beforeEach(function() {
    this.title = 'Groceries';
    this.plannedAmount = 230;
    this.actualAmount = 100;
    this.category = TestUtils.renderIntoDocument(
      <SubCategory title={this.title}
                   income={false}
                   plannedAmount={this.plannedAmount}
                   actualAmount={this.actualAmount}/>
    );
  });

  it('renders without problems', function() {
    expect(this.category).toBeTruthy();
  });

  it('renders exactly 1 sub-category-title', function() {
    const titles = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category, 'sub-category-title');
    expect(titles.length).toEqual(1);
    expect(titles[0].textContent).toEqual(this.title);
  });

  it('renders exactly 1 sub-category-amount', function() {
    const amounts = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category, 'sub-category-amount');
    expect(amounts.length).toEqual(1);
    expect(amounts[0].textContent).toContain(this.plannedAmount);
    expect(amounts[0].textContent).toContain(this.actualAmount);
  });

  it('renders exactly 1 ProgressBar component', function() {
    const bars = TestUtils.scryRenderedComponentsWithType(
      this.category, ProgressBar);
    expect(bars.length).toEqual(1);
  });

  it('renders exactly 1 sub-category-message', function() {
    const messages = TestUtils.scryRenderedDOMComponentsWithClass(
      this.category, 'sub-category-message');
    expect(messages.length).toEqual(1);
  });

  it('renders the correct message when actual expense < planned expense',
  function() {
    const plannedAmount = 230;
    const actualAmount = 100;
    testMessage(plannedAmount, actualAmount, false,
      `$${plannedAmount - actualAmount} left`);
  });

  it('renders the correct message when actual expense > planned expense',
  function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    testMessage(plannedAmount, actualAmount, false,
      `$${actualAmount - plannedAmount} over`);
  });

  it('renders the correct message when actual income < planned income',
  function() {
    const plannedAmount = 230;
    const actualAmount = 100;
    testMessage(plannedAmount, actualAmount, true,
      `$${plannedAmount - actualAmount} to go`);
  });

  it('renders the correct message when actual income > planned income',
  function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    testMessage(plannedAmount, actualAmount, true,
      `$${actualAmount - plannedAmount} extra`);
  });
});

function testMessage(plannedAmount, actualAmount, income, msg) {
  let category = TestUtils.renderIntoDocument(
    <SubCategory title={'Title'}
                 income={income}
                 plannedAmount={plannedAmount}
                 actualAmount={actualAmount}/>
  );
  let message = TestUtils.findRenderedDOMComponentWithClass(
    category, 'sub-category-message').textContent;
  expect(message).toEqual(msg);
}
