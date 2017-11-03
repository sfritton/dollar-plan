import React from "react";
import { Glyphicon } from "react-bootstrap";

class BudgetFooter extends React.Component {
  render() {
    return (
      <div>
        <div className="footer-msg">{"Balance: " + this.formatBalance()}</div>
        <div className="footer-btn">{this.renderButton()}</div>
      </div>
    );
  }
  formatBalance() {
    if (this.props.balance < 0) {
      return "-$" + this.props.balance * -1;
    }

    return "$" + this.props.balance;
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

export default BudgetFooter;
