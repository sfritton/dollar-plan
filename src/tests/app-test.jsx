var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    expect = require('expect'),
    App = require('../app.js');

describe('App', function() {
  it('renders the title', function() {
    var app = TestUtils.renderIntoDocument(
      <App />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');

    expect(h1.getDOMNode().textContent).toEqual('Hello Electron!');
  });
});
