import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Home from './home';
import Category from '../category/category';
import SubCategory from '../sub-category/sub-category';
import Page from '../page/page';

describe('Home', function() {
  beforeEach(function() {
    this.budget = {
      month: 10,
      year: 2017,
      incomes: [
        {title: 'Sam', plannedAmount: 6000, actualAmount: 3000},
        {title: 'Ellen', plannedAmount: 700, actualAmount: 900}
      ],
      expenses: [
        {
          title: 'Investments & Savings',
          subCategories: [
            {title: 'Donations', plannedAmount: 100, actualAmount: 0},
            {title: 'Roth IRA', plannedAmount: 600, actualAmount: 0}
          ]
        },
        {
          title: 'Apartment',
          subCategories: [
            {title: 'Rent & Water', plannedAmount: 1320, actualAmount: 1320},
            {title: 'Electric', plannedAmount: 49, actualAmount: 49}
          ]
        }
      ]
    }
    this.home = TestUtils.renderIntoDocument(<Home budget={this.budget}/>);
  });

  it('renders without problems', function() {
    expect(this.home).toBeTruthy();
  });

  it('renders exactly 2 Category components', function() {
    const categories = TestUtils.scryRenderedComponentsWithType(this.home, Category);
    expect(categories.length).toEqual(2);
  });

  it('renders exactly 6 SubCategory components', function() {
    const subCats = TestUtils.scryRenderedComponentsWithType(this.home, SubCategory);
    expect(subCats.length).toEqual(6);
  });

  it('renders exactly 1 Page component', function() {
    const pages = TestUtils.scryRenderedComponentsWithType(this.home, Page);
    expect(pages.length).toEqual(1);
  });

  it('renders exactly 2 section headers', function() {
    const headers = TestUtils.scryRenderedDOMComponentsWithClass(this.home, 'section-header');
    expect(headers.length).toEqual(2);
  });

  it('renders the correct year', function() {
    const header = TestUtils.findRenderedDOMComponentWithClass(this.home, 'header');
    expect(header.textContent).toContain(this.budget.year);
  });

  it('returns the correct month in all cases', function() {
    const months = [
      {input: 1, expectedMonth: 'January'},
      {input: 2, expectedMonth: 'February'},
      {input: 3, expectedMonth: 'March'},
      {input: 4, expectedMonth: 'April'},
      {input: 5, expectedMonth: 'May'},
      {input: 6, expectedMonth: 'June'},
      {input: 7, expectedMonth: 'July'},
      {input: 8, expectedMonth: 'August'},
      {input: 9, expectedMonth: 'September'},
      {input: 10, expectedMonth: 'October'},
      {input: 11, expectedMonth: 'November'},
      {input: 12, expectedMonth: 'December'},
      {input: -1, expectedMonth: 'Frittembruary'},
      {input: 13, expectedMonth: 'Frittembruary'}
    ];
    months.map((month) => {
      let h = TestUtils.renderIntoDocument(<Home budget={{month: month.input, year: 2017, incomes: [], expenses: []}} />);
      let header = TestUtils.findRenderedDOMComponentWithClass(h, 'header');
      expect(header.textContent).toContain(month.expectedMonth);
    });
  });
});
