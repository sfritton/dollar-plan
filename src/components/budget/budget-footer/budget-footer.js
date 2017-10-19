import React from "react";

class BudgetFooter extends React.Component {
  formatBalance() {
    if (this.props.balance < 0) {
      return "-$" + this.props.balance * -1;
    }

    return "$" + this.props.balance;
  }
  render() {
    return (
      <div>
        <div className="footer-msg">{"Balance: " + this.formatBalance()}</div>
        <div className="footer-btn">
          <button className="button">Adjust Budget</button>
        </div>
      </div>
    );
  }
}

export default BudgetFooter;
