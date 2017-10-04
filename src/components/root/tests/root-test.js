import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Root from '../root';

describe('root', function() {
  it('renders without problems', function() {
    var root = TestUtils.renderIntoDocument(<Root/>);
    expect(root).toBeTruthy();
  });
});
