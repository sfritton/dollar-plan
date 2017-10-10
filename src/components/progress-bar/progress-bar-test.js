import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import ProgressBar from './progress-bar';

describe('ProgressBar', function() {

  it('renders without problems', function() {
    const progressBar = TestUtils.renderIntoDocument(<ProgressBar/>);
    expect(progressBar).toBeTruthy();
  });

  it('renders a number between 1 and 0 correctly', function() {
    const percent = .25;
    const progressBar = TestUtils.renderIntoDocument(<ProgressBar percent={percent}/>);
    const outers = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_outer');
    const inners = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_inner');
    const dangers = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_danger');

    expect(outers.length).toEqual(1);
    expect(inners.length).toEqual(1);
    expect(dangers.length).toEqual(0);
  });

  it('renders a number below 0 correctly', function() {
    const percent = 0;
    const progressBar = TestUtils.renderIntoDocument(<ProgressBar percent={percent}/>);
    const outers = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_outer');
    const inners = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_inner');
    const dangers = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_danger');

    expect(outers.length).toEqual(1);
    expect(inners.length).toEqual(0);
    expect(dangers.length).toEqual(0);
  });

  it('renders a number above 1 correctly', function() {
    const percent = 1.5;
    const progressBar = TestUtils.renderIntoDocument(<ProgressBar percent={percent}/>);
    const outers = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_outer');
    const inners = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_inner');
    const dangers = TestUtils.scryRenderedDOMComponentsWithClass(progressBar, 'pb_danger');

    expect(outers.length).toEqual(0);
    expect(inners.length).toEqual(0);
    expect(dangers.length).toEqual(1);
  });
});
