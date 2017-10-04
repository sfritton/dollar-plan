import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Root from './root';
import Welcome from '../welcome/welcome';

describe('root', function() {
  beforeEach(function() {
    this.root = TestUtils.renderIntoDocument(<Root/>);
  });

  it('renders without problems', function() {
    expect(this.root).toBeTruthy();
  });

  it('renders the Welcome component', function() {
    var welcomes = TestUtils.scryRenderedComponentsWithType(this.root, Welcome);
    expect(welcomes.length).toEqual(1);
  });
});
