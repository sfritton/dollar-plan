import React from "react";

("use strict");

class ProgressBar extends React.Component {
  render() {
    if (this.props.percent > 1) {
      return this.renderAbove100();
    }

    if (this.props.percent <= 0) {
      return this.render0();
    }

    return this.renderNormal();
  }
  renderAbove100() {
    if (this.props.income) {
      return <div className="progbar progbar-inner" />;
    }

    return <div className="progbar progbar-danger" />;
  }
  render0() {
    return <div className="progbar progbar-outer" />;
  }
  renderNormal() {
    return (
      <div className="progbar progbar-outer">
        <div className="progbar progbar-inner" style={this.style()} />
      </div>
    );
  }
  style() {
    return { width: this.props.percent * 100 + "%" };
  }
}

export default ProgressBar;