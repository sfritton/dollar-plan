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
      <SubCategory title={this.title} income={false} plannedAmount={this.plannedAmount} actualAmount={this.actualAmount}/>
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
    expect(amounts[0].textContent).toContain(this.actualAmount);
  });

  it('renders exactly 1 ProgressBar component', function() {
    const bars = TestUtils.scryRenderedComponentsWithType(this.category, ProgressBar);
    expect(bars.length).toEqual(1);
  });

  it('renders exactly 1 sub-category-message', function() {
    const messages = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'sub-category-message');
    expect(messages.length).toEqual(1);
  });

  it('renders the correct message when the actual expense is less than the planned expense', function() {
    const message = TestUtils.findRenderedDOMComponentWithClass(this.category, 'sub-category-message').textContent;
    expect(message).toEqual(`$${this.plannedAmount - this.actualAmount} left`);
  });

  it('renders the correct message when the actual expense is greater than the planned expense', function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    const category = TestUtils.renderIntoDocument(
      <SubCategory title={this.title} income={false} plannedAmount={plannedAmount} actualAmount={actualAmount}/>
    );
    const message = TestUtils.findRenderedDOMComponentWithClass(category, 'sub-category-message').textContent;
    expect(message).toEqual(`$${actualAmount - plannedAmount} over`);
  });

  it('renders the correct message when the actual income is less than the planned income', function() {
    const plannedAmount = 230;
    const actualAmount = 100;
    const category = TestUtils.renderIntoDocument(
      <SubCategory title={this.title} income={true} plannedAmount={plannedAmount} actualAmount={actualAmount}/>
    );
    const message = TestUtils.findRenderedDOMComponentWithClass(category, 'sub-category-message').textContent;
    expect(message).toEqual(`$${plannedAmount - actualAmount} to go`);
  });

  it('renders the correct message when the actual income is greater than the planned income', function() {
    const plannedAmount = 100;
    const actualAmount = 230;
    const category = TestUtils.renderIntoDocument(
      <SubCategory title={this.title} income={true} plannedAmount={plannedAmount} actualAmount={actualAmount}/>
    );
    const message = TestUtils.findRenderedDOMComponentWithClass(category, 'sub-category-message').textContent;
    expect(message).toEqual(`$${actualAmount - plannedAmount} extra`);
  });
});
