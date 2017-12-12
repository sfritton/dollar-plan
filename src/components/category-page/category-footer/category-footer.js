import React from "react";
import { Glyphicon } from "react-bootstrap";

export default class CategoryFooter extends React.Component {
  render() {
    return (
      <div>
        <div className="footer-msg">{this.renderBackButton()}</div>
        <div className="footer-btn">{this.renderEditButton()}</div>
      </div>
    );
  }

  renderBackButton() {
    return (
      <button
        className="button"
        onClick={this.props.back}
      >
        <Glyphicon glyph="arrow-left" /> Back to budget
      </button>
    );
  }
  
  renderEditButton() {
    if (this.props.edit) {
      return (
        <button className="button" onClick={this.props.saveTransactions}>
          <Glyphicon glyph="ok" /> Save Transactions
        </button>
      );
    }

    return (
      <button className="button" onClick={this.props.editTransactions}>
        <Glyphicon glyph="pencil" /> Edit Transactions
      </button>
    );
  }
}
