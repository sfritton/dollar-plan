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
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            <div className="footer-msg">
              {"Balance: " + this.formatBalance()}
            </div>
          </Col>
          <Col xs={0} md={4} />
          <Col xs={6} md={4}>
            <button className="button">Adjust Budget</button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default BudgetFooter;
