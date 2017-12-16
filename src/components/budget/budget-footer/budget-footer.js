import React from "react";
import { Glyphicon } from "react-bootstrap";

export default class BudgetFooter extends React.Component {
  render() {
    return (
      <div>
        <div className="footer-msg">{this.props.message}</div>
        <div className="footer-btn">{this.renderButton()}</div>
      </div>
    );
  }

  renderButton() {
    if (this.props.edit) {
      return (
        <button className="button" onClick={this.props.save}>
          <Glyphicon glyph="ok" /> Save Budget
        </button>
      );
    }

    return (
      <button className="button" onClick={this.props.adjust}>
        <Glyphicon glyph="pencil" /> Adjust Budget
      </button>
    );
  }
}
