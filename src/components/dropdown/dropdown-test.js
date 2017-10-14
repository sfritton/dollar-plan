import React from 'react'; // eslint-disable-line no-unused-vars
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Dropdown from './dropdown';

describe('Dropdown', function() {
  beforeEach(function() {
    this.options = [{id: 1, name: 'option 1'}, {id: 2, name: 'option 2'}];
    this.dropdown = TestUtils.renderIntoDocument(
      <Dropdown options={this.options}/>);
  });

  it('renders without problems', function() {
    expect(this.dropdown).toBeTruthy();
  });

  it('renders 2 options', function() {
    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      this.dropdown, 'option');
    expect(options.length).toEqual(2);
  });

  it('renders the names of the options', function() {
    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      this.dropdown, 'option');
    expect(options[0].textContent).toEqual(this.options[0].name);
  });
});
