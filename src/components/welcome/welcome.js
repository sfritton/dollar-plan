import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import MonthDropdown from '../month-dropdown/month-dropdown';
import YearDropdown from '../year-dropdown/year-dropdown';

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
            <MonthDropdown /><YearDropdown />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Welcome;
