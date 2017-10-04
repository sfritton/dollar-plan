import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import MonthDropdown from './month-dropdown';

describe('MonthDropdown', function() {
  beforeEach(function() {
    this.monthDropdown = TestUtils.renderIntoDocument(<MonthDropdown/>);
  });

  it('renders without problems', function() {
    expect(this.monthDropdown).toBeTruthy();
  });

  it('renders 12 options', function() {
    var options = TestUtils.scryRenderedDOMComponentsWithTag(this.monthDropdown, 'option');
    expect(options.length).toEqual(12);
  });
});
