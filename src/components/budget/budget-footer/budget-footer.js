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
        <div>
          <button
            className="button"
            style={{ marginRight: "15px" }}
            onClick={this.props.cancel}
          >
            <Glyphicon glyph="remove" /> Cancel
          </button>
          <button className="button" onClick={this.props.save}>
            <Glyphicon glyph="ok" /> Save Budget
          </button>
        </div>
      );
    }

    return (
      <button className="button" onClick={this.props.adjust}>
        <Glyphicon glyph="pencil" /> Adjust Budget
      </button>
    );
  }
}
