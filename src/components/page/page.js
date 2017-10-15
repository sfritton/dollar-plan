import React from "react";

("use strict");

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className="pg-header">{this.props.header}</div>
        <div className="pg-body">{this.props.children}</div>
        {this.props.footer ? (
          <div className="pg-footer">{this.props.footer}</div>
        ) : null}
      </div>
    );
  }
}

export default Page;
