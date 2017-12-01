import React from "react";
import { Collapse, Glyphicon } from "react-bootstrap";
import { Route } from "react-router-dom";

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
        {this.renderOtherBudgetOptions()}
        <li className="nav-select-divider" />
        {this.renderCreateNewOption()}
      </ul>
    );
  }

  renderOtherBudgetOptions() {
    const otherBudgets = this.props.options.filter(
      item =>
        !this.props.selected ||
        (item.month !== this.props.selected.month ||
          item.year !== this.props.selected.year)
    );

    return otherBudgets.map((item, i) => (
      <Route
        key={i}
        render={({ history }) => (
          <li
            className="nav-select-option"
            value={DateService.encodeDate(item.month, item.year)}
            onClick={() => {
              this.setState({ open: false });
              history.push(
                `/budget/${DateService.encodeDate(item.month, item.year)}`
              );
            }}
          >
            {item.name}
          </li>
        )}
      />
    ));
  }

  renderCreateNewOption() {
    return (
      <Route
        render={({ history }) => (
          <li
            className="nav-select-option"
            value="new_budget"
            onClick={() => {
              this.setState({ open: false });
              history.push("/welcome");
            }}
          >
            <Glyphicon glyph="plus" style={{ fontSize: "75%" }} />
            {" Create new"}
          </li>
        )}
      />
    );
  }

  toggleOpen() {
    this.setState(prevState => ({ open: !prevState.open }));
  }
}

export default HeaderDropdown;
