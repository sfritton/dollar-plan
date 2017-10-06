import React from 'react';
import ReactDOM from 'react-dom';

import Page from '../page/page';
import ProgressBar from '../progress-bar/progress-bar';

'use strict';

class Home extends React.Component {
  render() {
    return (
      <Page header={'November 2017, 15 days left'}>
        <ProgressBar/>
      </Page>
    );
  }
}

export default Home;
