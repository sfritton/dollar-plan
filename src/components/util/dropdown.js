import React from "react";

("use strict");

class Dropdown extends React.Component {
  render() {
    return (
      <select
        onChange={e => this.props.updateSelected(e.target.value)}
        value={this.props.selected}
      >
        {this.props.options.map((item, i) => (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
}

export default Dropdown;
