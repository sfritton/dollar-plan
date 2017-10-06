import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';

import Dropdown from '../dropdown/dropdown';
import Page from '../page/page';

'use strict';

class Welcome extends React.Component {
  render() {
    return (
      <Page header={Welcome.title}>
        <div className="padding-10"></div>
        <Grid>
          <Row>
            {'It looks like you don\'t have any budgets. Would you like to create one?'}
          </Row>
          <Row>
            <Dropdown options={Welcome.months} />
            <Dropdown options={Welcome.years} />
            <button className="submit">Create</button>
          </Row>
        </Grid>
      </Page>
    );
  }
}
Welcome.title = <span>Welcome to <span className="header-accent">$</span>Plan</span>;

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
