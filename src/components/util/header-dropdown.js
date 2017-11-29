import React from "react";
import { Collapse, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";

import DateService from "../../services/date-service";

("use strict");

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div className="nav-select">
        <div className="nav-select-button" onClick={() => this.toggleOpen()}>
          {this.props.selected && this.props.selected.name}
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
              !this.props.selected ||
              (item.month !== this.props.selected.month ||
                item.year !== this.props.selected.year)
            );
          })
          .map((item, i) => (
            <li
              className="nav-select-option"
              key={i}
              value={`${item.year}-${item.month}`}
            >
              <Link
                to={`/budget/${DateService.encodeDate(item.month, item.year)}`}
              >
                {item.name}
              </Link>
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
}

export default HeaderDropdown;
