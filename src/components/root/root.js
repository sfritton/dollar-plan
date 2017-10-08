import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from '../welcome/welcome';
import Home from '../home/home';
import budget from '../../data/sample-budget';

'use strict';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Home budget={budget}/>
      </div>
    );
  }
}

export default Root;
