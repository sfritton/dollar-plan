import React from 'react';

'use strict';

class Dropdown extends React.Component {
  render() {
    return (
      <select>
        {this.props.options.map((item, i) =>
          <option key={i} value={item.id}>{item.name}</option>)}
      </select>
    );
  }
}

export default Dropdown;
