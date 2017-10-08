import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Category from './category';
import ProgressBar from '../progress-bar/progress-bar';

xdescribe('Category', function() {
  beforeEach(function() {
    this.title = 'Groceries';
    this.plannedAmount = 230;
    this.actualAmount = 100;
    this.category = TestUtils.renderIntoDocument(
      <Category title={this.title} plannedAmount={this.plannedAmount} actualAmount={this.actualAmount}/>
    );
  });

  it('renders without problems', function() {
    expect(this.category).toBeTruthy();
  });

  it('renders exactly 1 category-title', function() {
    var titles = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'category-title');
    expect(titles.length).toEqual(1);
    expect(titles[0].textContent).toEqual(this.title);
  });

  it('renders exactly 1 category-amount', function() {
    var amounts = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'category-amount');
    expect(amounts.length).toEqual(1);
    expect(amounts[0].textContent).toContain(this.plannedAmount);
  });

  it('renders exactly 1 ProgressBar component', function() {
    var bars = TestUtils.scryRenderedComponentsWithType(this.category, ProgressBar);
    expect(bars.length).toEqual(1);
  });

  it('renders exactly 1 category-message', function() {
    var messages = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'category-message');
    expect(messages.length).toEqual(1);
  });

  it('renders the correct message when the actual amount is less than the planned amount', function() {
    var message = TestUtils.findRenderedDOMComponentWithClass(this.category, 'category-message').textContent;
    expect(message).toEqual(`$${this.plannedAmount - this.actualAmount} left to spend`);
  });

  it('renders the correct message when the actual amount is the same as the planned amount', function() {
    var amount = 100;
    var category = TestUtils.renderIntoDocument(
      <SpendingCategory title={this.title} plannedAmount={amount} actualAmount={amount}/>
    );
    var message = TestUtils.findRenderedDOMComponentWithClass(category, 'category-message').textContent;
    expect(message).toEqual('nothing left to spend');
  });

  it('renders the correct message when the actual amount is greater than the planned amount', function() {
    var plannedAmount = 100;
    var actualAmount = 230;
    var category = TestUtils.renderIntoDocument(
      <SpendingCategory title={this.title} plannedAmount={plannedAmount} actualAmount={actualAmount}/>
    );
    var message = TestUtils.findRenderedDOMComponentWithClass(category, 'category-message').textContent;
    expect(message).toEqual(`$${actualAmount - plannedAmount} overbudget!`);
  });
});
