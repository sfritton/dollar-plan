import React from "react";

class Input extends React.Component {
  render() {
    return (
      <input
        className={`text-input ${this.props.className}`}
        style={{ width: this.props.width || "100%" }}
        type="text"
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Input;
