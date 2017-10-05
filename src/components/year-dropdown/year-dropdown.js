import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

'use strict';

class YearDropdown extends React.Component {
  render() {
    return (
      <select>
        {YearDropdown.years.map((year, i) => <option key={i} value={year}>{year}</option>)}
      </select>
    );
  }
}

YearDropdown.years = _.range(2017, 2117);

export default YearDropdown;
