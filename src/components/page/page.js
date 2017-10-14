import React from "react";

("use strict");

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className="header">{this.props.header}</div>
        <div className="page-body">{this.props.children}</div>
        {this.props.footer ? (
          <div className="footer">{this.props.footer}</div>
        ) : null}
      </div>
    );
  }
}

export default Page;
