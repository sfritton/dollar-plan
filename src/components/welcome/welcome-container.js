import { connect } from "react-redux";

import Welcome from "./welcome";
import DateService from "../../services/date-service";

const WelcomeContainer = connect(store => ({
  budgetDates: store.budgets.budgets.map(({ date }) => ({
    value: DateService.encodeDate(date.month, date.year),
    name: `${DateService.getMonthName(date.month)} ${date.year}`
  }))
}))(Welcome);

export default WelcomeContainer;
