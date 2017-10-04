import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Root from './root';

describe('root', function() {
  beforeEach(function() {
    this.root = TestUtils.renderIntoDocument(<Root/>);
  });

  it('renders without problems', function() {
    expect(this.root).toBeTruthy();
  });
});
