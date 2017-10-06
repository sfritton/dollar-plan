import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';

import Welcome from './welcome';
import Dropdown from '../dropdown/dropdown';
import Page from '../page/page';

describe('Welcome', function() {
  beforeEach(function() {
    this.welcome = TestUtils.renderIntoDocument(<Welcome/>);
  });

  it('renders without problems', function() {
    expect(this.welcome).toBeTruthy();
  });

  it('renders a Page component', function() {
    var pages = TestUtils.scryRenderedComponentsWithType(this.welcome, Page);
    expect(pages.length).toEqual(1);
  });

  it('renders 2 Dropdown components', function() {
    var dropdowns = TestUtils.scryRenderedComponentsWithType(this.welcome, Dropdown);
    expect(dropdowns.length).toEqual(2);
  });

  it('renders a button', function() {
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(this.welcome, 'button');
    expect(buttons.length).toEqual(1);
  });
});
