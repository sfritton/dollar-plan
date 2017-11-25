import React from "react";
import { Collapse, Glyphicon } from "react-bootstrap";

("use strict");

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selected: props.selected || props.options[0] || null
    };
  }
  render() {
    return (
      <div className="nav-select">
        <div className="nav-select-button" onClick={() => this.toggleOpen()}>
          {this.state.selected && this.state.selected.name}
          <Glyphicon glyph="triangle-bottom" className="nav-select-glyph" />
        </div>
        <Collapse in={this.state.open}>{this.renderOptions()}</Collapse>
      </div>
    );
  }
  renderOptions() {
    return (
      <ul className="nav-select-list">
        {this.props.options
          .filter(item => {
            return (
              !this.state.selected ||
              (item.month !== this.state.selected.month ||
                item.year !== this.state.selected.year)
            );
          })
          .map((item, i) => (
            <li
              className="nav-select-option"
              key={i}
              value={`${item.year}-${item.month}`}
              onClick={() => {
                this.updateSelected(item);
                this.props.navigateTo("budget", {
                  date: { month: item.month, year: item.year }
                });
              }}
            >
              {item.name}
            </li>
          ))}
        <li className="nav-select-divider" />
        <li
          className="nav-select-option"
          value="new_budget"
          onClick={() => this.props.navigateTo("welcome")}
        >
          <Glyphicon glyph="plus" style={{ fontSize: "75%" }} />
          {" Create new"}
        </li>
      </ul>
    );
  }
  toggleOpen() {
    this.setState(prevState => ({ open: !prevState.open }));
  }
  updateSelected(item) {
    this.setState({
      selected: item,
      open: false
    });
  }
}

export default HeaderDropdown;
