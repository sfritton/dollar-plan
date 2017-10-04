import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

class MonthDropdown extends React.Component {
  render() {
    return (
      <select>
        {MonthDropdown.months.map((month, i) => <option key={i} value={month.id}>{month.name}</option>)}
      </select>
    );
  }
}

MonthDropdown.months = [
 	{id: 1, name: 'January'},
 	{id: 2, name: 'February'},
 	{id: 3, name: 'March'},
 	{id: 4, name: 'April'},
	{id: 5, name: 'May'},
	{id: 6, name: 'June'},
	{id: 7, name: 'July'},
	{id: 8, name: 'August'},
	{id: 9, name: 'September'},
	{id: 10, name: 'October'},
	{id: 11, name: 'November'},
	{id: 12, name: 'December'}
];

export default MonthDropdown;
