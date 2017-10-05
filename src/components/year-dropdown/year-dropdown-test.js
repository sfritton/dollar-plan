import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import YearDropdown from './year-dropdown';

describe('YearDropdown', function() {
  beforeEach(function() {
    this.yearDropdown = TestUtils.renderIntoDocument(<YearDropdown/>);
  });

  it('renders without problems', function() {
    expect(this.yearDropdown).toBeTruthy();
  });

  it('renders 100 years starting with 2017', function() {
    var options = TestUtils.scryRenderedDOMComponentsWithTag(this.yearDropdown, 'option');
    expect(options.length).toEqual(100);
    expect(options[0].textContent).toEqual('2017');
  });
});
