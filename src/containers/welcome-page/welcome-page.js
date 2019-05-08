import React, { Component, Fragment } from "react";
import "./welcome-page.less";
import { connect } from "react-redux";

import { setNewBudgetPage as setNewBudgetPageAction } from "Redux/ui/actions";
import { Button } from "Components";
import BudgetPicker from "./budget-picker";

class WelcomePage extends Component {
  constructor() {
    super();

    this.state = { isChoosingBudget: false };
  }
  render() {
    const { hasBudgets, setNewBudgetPage } = this.props;
    const { isChoosingBudget } = this.state;

    return (
      <div className="welcome">
        <h1 className="welcome--title">Dollar Plan</h1>
        {isChoosingBudget ? (
          <BudgetPicker />
        ) : (
          <div className="welcome--fade-in">
            {hasBudgets && (
              <Fragment>
                <Button
                  className="welcome--wide-btn"
                  onClick={() => this.setState({ isChoosingBudget: true })}
                >
                  Choose a budget
                </Button>
                <div>or</div>
              </Fragment>
            )}
            <Button
              className="welcome--wide-btn"
              outlined={hasBudgets}
              onClick={setNewBudgetPage}
            >
              Create a new {hasBudgets ? "one" : "budget"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasBudgets: Object.keys(state.budgets).length > 0
});

const mapDispatchToProps = dispatch => ({
  setNewBudgetPage: () => dispatch(setNewBudgetPageAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
