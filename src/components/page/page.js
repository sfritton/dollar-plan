import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

'use strict';

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Page;
