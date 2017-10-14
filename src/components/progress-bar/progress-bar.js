import React from "react";

("use strict");

class ProgressBar extends React.Component {
  style() {
    return { width: this.props.percent * 100 + "%" };
  }
  render0() {
    return <div className="pb pb_outer" />;
  }
  renderNormal() {
    return (
      <div className="pb pb_outer">
        <div className="pb pb_inner" style={this.style()} />
      </div>
    );
  }
  renderAbove100() {
    if (this.props.income) {
      return <div className="pb pb_inner" />;
    }

    return <div className="pb pb_danger" />;
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
