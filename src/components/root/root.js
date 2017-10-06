import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from '../welcome/welcome';
import Home from '../home/home';

'use strict';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default Root;
