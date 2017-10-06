import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import ProgressBar from './progress-bar';

describe('ProgressBar', function() {
  beforeEach(function() {
    this.progressBar = TestUtils.renderIntoDocument(<ProgressBar/>);
  });

  it('renders without problems', function() {
    expect(this.progressBar).toBeTruthy();
  });
});
