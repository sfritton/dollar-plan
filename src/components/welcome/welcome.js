import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import Dropdown from '../dropdown/dropdown';

'use strict';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <div className="header">Welcome to <span className="header-accent">$</span>Plan</div>
        <Grid className="page">
          <Row>
            {'It looks like you don\'t have any budgets. Would you like to create one?'}
          </Row>
          <Row>
            <Dropdown options={Welcome.months} />
            <Dropdown options={Welcome.years} />
          </Row>
        </Grid>
      </div>
    );
  }
}

Welcome.months = [
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

Welcome.years = _.range(2017, 2117).map((year) => { return {id: year, name: year}; });

export default Welcome;
