import React from "react";
import { Collapse } from "react-bootstrap";

("use strict");

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: props.selected || props.options[0]
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }
  render() {
    return (
      <div className="nav-select">
        <div className="nav-select-button" onClick={this.toggleOpen}>
          {this.state.selected.name}
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
            return item.id != this.state.selected.id;
          })
          .map((item, i) => (
            <li
              className="nav-select-option"
              key={i}
              value={item.id}
              onClick={() => {
                this.updateSelected(item.id);
              }}
            >
              {item.name}
            </li>
          ))}
      </ul>
    );
  }
  toggleOpen() {
    this.setState(prevState => ({ open: !prevState.open }));
  }
  updateSelected(id) {
    this.setState({
      selected: this.props.options.find(item => {
        return item.id === id;
      }),
      open: false
    });
  }
}

export default HeaderDropdown;
