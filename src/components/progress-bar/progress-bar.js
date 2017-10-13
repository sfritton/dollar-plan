import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

class ProgressBar extends React.Component {
  style() {
    return { width: (this.props.percent * 100) + '%' };
  }
  render0() {
    return (
      <div className="pb pb_outer"></div>
    );
  }
  renderNormal() {
    return (
      <div className="pb pb_outer">
        <div className="pb pb_inner" style={this.style()}></div>
      </div>
    );
  }
  renderAbove100() {
    if (this.props.income) {
      return (
        <div className="pb pb_inner"></div>
      );
    }
    
    return (
      <div className="pb pb_danger"></div>
    );
  }
  render() {
    if (this.props.percent > 1) {
      return this.renderAbove100();
    }

    if (this.props.percent <= 0) {
      return this.render0();
    }

    return this.renderNormal();
  }
}

export default ProgressBar;
