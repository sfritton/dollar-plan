import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

class ProgressBar extends React.Component {
  render() {
    return (
      <div className="pb pb_outer">
        <div className="pb pb_inner"></div>
      </div>
    );
  }
}

export default ProgressBar;
