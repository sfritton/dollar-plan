import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import SpendingCategory from './spending-category';

describe('Home', function() {
  beforeEach(function() {
    this.category = TestUtils.renderIntoDocument(<SpendingCategory/>);
  });

  it('renders without problems', function() {
    expect(this.category).toBeTruthy();
  });
});
