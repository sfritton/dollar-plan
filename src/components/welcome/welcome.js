import React, { Component } from "react";
import './welcome.less';

import Pages from "../../constants/pages-enum";
import Months from "../../constants/months";
import { createNewBudget } from "../../actions/budget-actions";
import { setPage, setEdit } from "../../actions/ui-actions";
import Dropdown from "../dropdown/dropdown";
import Button from "../button/button";
import Page from "../page/page";
import DateService from "../../services/date-service";

const currentYear = new Date().getFullYear();
const nextTenYears = new Array(10)
  .fill(0)
  .map((elem, i) => ({ value: i + currentYear, name: i + currentYear }));

const FormSection = ({ children, invisible }) => (
  <div className={`form-section ${invisible ? 'form-section--invisible' : ''}`}>{children}</div>
);

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    const canCopy = props.budgetDates.length > 0;

    this.state = {
      month: Months[0].value,
      year: nextTenYears[0].value,
      copyOldBudget: false,
      canCopy,
      oldDate: canCopy && props.budgetDates[0].value
    };

    this.createBudget = this.createBudget.bind(this);
  }

  createBudget() {
    const { dispatch } = this.props;
    const { month, year, copyOldBudget, oldDate } = this.state;

    if (copyOldBudget) {
      const decodedOldDate = DateService.decodeDate(oldDate);
      dispatch(createNewBudget(month, year, decodedOldDate.month, decodedOldDate.year));
    } else {
      dispatch(createNewBudget(month, year));
    }

    dispatch(setEdit(true));
    dispatch(setPage(Pages.BUDGET));
  }

  render() {
    const { budgetDates, dispatch } = this.props;

    const {
      month,
      year,
      copyOldBudget,
      canCopy,
      oldDate
    } = this.state;

    return (
      <Page header={<h1>New budget</h1>}>
        <section>
          <FormSection>Select a month and a year for the new budget</FormSection>

          <FormSection>
            <Dropdown
              options={Months}
              value={month}
              onChange={m => this.setState({ month: parseInt(m) })}
            />
            <Dropdown
              options={nextTenYears}
              value={year}
              onChange={year => this.setState({ year: parseInt(y) })}
            />
          </FormSection>

          <FormSection invisible={!canCopy}>
            <input
              type="checkbox"
              disabled={!canCopy}
              onChange={() =>
                this.setState(prevState => ({
                  copyOldBudget: !prevState.copyOldBudget
                }))}
            />{" "}
            Copy a previous budget
          </FormSection>

          <FormSection invisible={!copyOldBudget}>
            <Dropdown
              disabled={!copyOldBudget}
              options={budgetDates}
              value={oldDate.value}
              onChange={date => this.setState({ oldDate: date })}
            />
          </FormSection>

          <FormSection>
            <Button onClick={this.createBudget} >
              Create budget
            </Button>
          </FormSection>
        </section>
      </Page>
    );
  }
}
