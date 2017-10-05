import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
require('./year-dropdown.less');

'use strict';

class YearDropdown extends React.Component {
  render() {
    return (
      <select className='years'>
        {YearDropdown.years.map((year, i) => <option key={i} className='years' value={year}>{year}</option>)}
      </select>
    );
  }
}

YearDropdown.years = _.range(2017, 2117);

export default YearDropdown;
