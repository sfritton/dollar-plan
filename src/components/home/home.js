import React from 'react';
import ReactDOM from 'react-dom';

import Page from '../page/page';
import ProgressBar from '../progress-bar/progress-bar';

'use strict';

class Home extends React.Component {
  render() {
    return (
      <Page header={'November 2017, 15 days left'}>
        <ProgressBar percent={.1}/>
        <ProgressBar percent={.05}/>
        <ProgressBar percent={.01}/>
        <ProgressBar percent={0}/>
        <ProgressBar percent={.75}/>
        <ProgressBar percent={1}/>
        <ProgressBar percent={1.5}/>
      </Page>
    );
  }
}

export default Home;
