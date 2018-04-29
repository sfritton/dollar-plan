import React from "react";

import "./nav-dropdown.less";
import DateService from "../../../services/date-service";

const NavList = ({ options, onSelect }) => (
  <ul className="nav-dropdown--list">
    {options.map(({ month, year }) => (
      <li
        className="nav-dropdown--option"
        key={DateService.encodeDate(month, year)}
      >
        <a href="#" onClick={() => onSelect({ month, year })}>
          {`${DateService.getMonthName(month)} ${year}`}
        </a>
      </li>
    ))}
    <li className="nav-dropdown--divider" />
    <li className="nav-dropdown--option">
      <a href="#" onClick={() => onSelect("new")}>
        create new budget
      </a>
    </li>
  </ul>
);

export default class NavDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.onSelect = this.onSelect.bind(this);
  }

  toggleOpen() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  onSelect(option) {
    this.setState({ open: false });

    if (option === "new") {
      this.props.createNewBudget();
      return;
    }

    this.props.setActiveBudget(option.month, option.year);
  }

  render() {
    const otherBudgets = this.props.options.filter(
      item =>
        !this.props.selected ||
        (item.month !== this.props.selected.month ||
          item.year !== this.props.selected.year)
    );

    return (
      <div className="nav-dropdown">
        <div tabIndex="0" className="nav-dropdown--heading">
          <h1 onClick={() => this.toggleOpen()}>
            {this.props.selected ? this.props.selected.name : "select a budget"}
          </h1>
        </div>
        {this.state.open && (
          <NavList options={otherBudgets} onSelect={this.onSelect} />
        )}
      </div>
    );
  }
}
