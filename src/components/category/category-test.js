import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Category from './category';
import SubCategory from '../sub-category/sub-category';
import ProgressBar from '../progress-bar/progress-bar';

describe('Category', function() {
  beforeEach(function() {
    this.title = 'Apartment';
    this.subCategories = [
      {title: 'Groceries', plannedAmount: 230,  actualAmount: 100},
      {title: 'Clothing', plannedAmount: 10,  actualAmount: 5}];
    this.category = TestUtils.renderIntoDocument(
      <Category title={this.title} defaultOpen={true} subCategories={this.subCategories}/>
    );
  });

  it('renders without problems', function() {
    expect(this.category).toBeTruthy();
  });

  it('renders exactly 1 category-title', function() {
    const titles = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'category-title');
    expect(titles.length).toEqual(1);
    expect(titles[0].textContent).toEqual(this.title);
  });

  it('renders exactly 1 category-amount', function() {
    const amounts = TestUtils.scryRenderedDOMComponentsWithClass(this.category, 'category-amount');
    expect(amounts.length).toEqual(1);
    expect(amounts[0].textContent).toContain(this.subCategories.reduce((sum, sub) => {return sum + sub.plannedAmount;}, 0));
    expect(amounts[0].textContent).toContain(this.subCategories.reduce((sum, sub) => {return sum + sub.actualAmount;}, 0));
  });

  it('renders exactly 3 ProgressBar component', function() {
    const bars = TestUtils.scryRenderedComponentsWithType(this.category, ProgressBar);
    expect(bars.length).toEqual(3);
  });

  it('renders exactly 2 sub-categories', function() {
    const subCats = TestUtils.scryRenderedComponentsWithType(this.category, SubCategory);
    expect(subCats.length).toEqual(2);
  });
});
