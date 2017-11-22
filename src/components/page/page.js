import React from "react";

("use strict");

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = { width: "0", height: "0" };
  }
  render() {
    return (
      <div style={{ height: this.state.height }}>
        <div className="pg-header">{this.props.header}</div>
        <div className="pg-body">{this.props.children}</div>
        {this.props.footer ? (
          <div className="pg-footer">{this.props.footer}</div>
        ) : null}
      </div>
    );
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", () => this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateWindowDimensions());
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}

export default Page;
