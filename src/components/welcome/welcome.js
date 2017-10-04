import React from 'react';
import ReactDOM from 'react-dom';

import MonthDropdown from '../month-dropdown/month-dropdown';

'use strict';

class Welcome extends React.Component {
  render() {
    return (
      <div className="myDiv">
        <h1>Welcome to $Plan</h1>
        <p>{'It looks like you don\'t have any budgets. Would you like to create one?'}</p>
        <MonthDropdown />
      </div>
    );
  }
}

export default Welcome;
