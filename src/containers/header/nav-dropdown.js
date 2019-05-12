import React from "react";

import "./nav-dropdown.less";
import { encodeDate, getMonthName } from "Util/date";

const NavList = ({ options, onSelect, isOpen }) => (
  <div
    className={`nav-dropdown--list ${isOpen ? "nav-dropdown--list--open" : ""}`}
    aria-hidden={!isOpen}
  >
    <ul>
      {options.map(({ month, year }) => (
        <li className="nav-dropdown--option" key={encodeDate(month, year)}>
          <a href="#" onClick={() => onSelect({ month, year })}>
            {`${getMonthName(month)} ${year}`}
          </a>
        </li>
      ))}
    </ul>
    <div className="nav-dropdown--divider" />
    <div className="nav-dropdown--option">
      <a href="#" onClick={() => onSelect("new")}>
        Create new budget
      </a>
    </div>
  </div>
);

export default class NavDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.onSelect = this.onSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick(e) {
    if (!this.state.open) return;

    if (!this.listRef || this.listRef.contains(e.target)) {
      return;
    }

    this.setState({ open: false });
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
    const { options, selected, isActive } = this.props;
    const otherBudgets = options.filter(
      ({ month, year }) =>
        !selected || (month !== selected.month || year !== selected.year)
    );

    const heading = selected
      ? `${getMonthName(selected.month)} ${selected.year}`
      : "select a budget";

    return (
      <div className="nav-dropdown" ref={ref => (this.listRef = ref)}>
        <button
          onClick={() => isActive && this.toggleOpen()}
          className={`nav-dropdown--heading ${isActive
            ? "nav-dropdown--heading--active"
            : ""}`}
        >
          <h1>{heading}</h1>
        </button>
        <NavList
          isOpen={this.state.open}
          options={otherBudgets}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
