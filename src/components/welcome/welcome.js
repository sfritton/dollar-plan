import React from 'react';
import ReactDOM from 'react-dom';

import MonthDropdown from '../month-dropdown/month-dropdown';
import YearDropdown from '../year-dropdown/year-dropdown';

'use strict';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <div className="header">Welcome to <span className="header-accent">$</span>Plan</div>
        <div className="page">
          {'It looks like you don\'t have any budgets. Would you like to create one?'}
          <MonthDropdown />
          <YearDropdown />
        </div>
      </div>
    );
  }
}

export default Welcome;
