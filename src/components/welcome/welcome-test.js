import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Welcome from './welcome';
import MonthDropdown from '../month-dropdown/month-dropdown';
import YearDropdown from '../year-dropdown/year-dropdown';

describe('Welcome', function() {
  beforeEach(function() {
    this.welcome = TestUtils.renderIntoDocument(<Welcome/>);
  });

  it('renders without problems', function() {
    expect(this.welcome).toBeTruthy();
  });

  it('renders the MonthDropdown component', function() {
    var monthDropdowns = TestUtils.scryRenderedComponentsWithType(this.welcome, MonthDropdown);
    expect(monthDropdowns.length).toEqual(1);
  });

  it('renders the YearDropdown component', function() {
    var yearDropdowns = TestUtils.scryRenderedComponentsWithType(this.welcome, YearDropdown);
    expect(yearDropdowns.length).toEqual(1);
  });
});
