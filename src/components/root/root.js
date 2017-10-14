import React from 'react';

import Home from '../home/home';
import budget from '../../../data/2017-11';

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
