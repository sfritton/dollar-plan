require('../less/main.less');

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render: function(){
    return (
      <div className="myDiv">
        {helloWorld()}
      </div>
    )
  }
});

function helloWorld() {
  return 'Hello Electron!';
}

ReactDOM.render(<App />, document.getElementById('content'));
