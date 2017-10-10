import React from 'react';
import ReactDOM from 'react-dom';
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
      <SubCategory title={this.title} plannedAmount={this.plannedAmount} actualAmount={this.actualAmount}/>
    );
  });

  it('renders without problems', function() {
    expect(this.category).toBeTruthy();
  });

  it('renders exactly 1 sub-category-title', function() {
    const titles = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'sub-category-title');
    expect(titles.length).toEqual(1);
    expect(titles[0].textContent).toEqual(this.title);
  });

  it('renders exactly 1 sub-category-amount', function() {
    const amounts = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'sub-category-amount');
    expect(amounts.length).toEqual(1);
    expect(amounts[0].textContent).toContain(this.plannedAmount);
  });

  it('renders exactly 1 ProgressBar component', function() {
    const bars = TestUtils.scryRenderedComponentsWithType(this.category, ProgressBar);
    expect(bars.length).toEqual(1);
  });

  it('renders exactly 1 sub-category-message', function() {
    const messages = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'sub-category-message');
    expect(messages.length).toEqual(1);
  });

  it('renders the correct message when the actual amount is less than the planned amount', function() {
    const message = TestUtils.findRenderedDOMComponentWithClass(this.category, 'sub-category-message').textContent;
    expect(message).toEqual(`$${this.plannedAmount - this.actualAmount} left to spend`);
  });

  it('renders the correct message when the actual amount is the same as the planned amount', function() {
    const amount = 100;
    const category = TestUtils.renderIntoDocument(
      <SubCategory title={this.title} plannedAmount={amount} actualAmount={amount}/>
    );
    const message = TestUtils.findRenderedDOMComponentWithClass(category, 'sub-category-message').textContent;
    expect(message).toEqual('nothing left to spend');
  });

  it('renders the correct message when the actual amount is greater than the planned amount', function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    const category = TestUtils.renderIntoDocument(
      <SubCategory title={this.title} plannedAmount={plannedAmount} actualAmount={actualAmount}/>
    );
    const message = TestUtils.findRenderedDOMComponentWithClass(category, 'sub-category-message').textContent;
    expect(message).toEqual(`$${actualAmount - plannedAmount} overbudget!`);
  });
});
