import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

class BudgetFooter extends React.Component {
  formatBalance() {
    if (this.props.balance < 0) {
      return "-$" + this.props.balance * -1;
    }

    return "$" + this.props.balance;
  }
  render() {
    return (
      <div className="footer-msg">{"Balance: " + this.formatBalance()}</div>
    );
  }
}

export default BudgetFooter;
