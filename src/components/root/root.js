import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from '../welcome/welcome';

'use strict';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Welcome />
      </div>
    );
  }
}

export default Root;
