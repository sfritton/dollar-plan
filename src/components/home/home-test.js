import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Home from './home';

describe('Home', function() {
  beforeEach(function() {
    this.home = TestUtils.renderIntoDocument(<Home/>);
  });

  it('renders without problems', function() {
    expect(this.home).toBeTruthy();
  });
});
