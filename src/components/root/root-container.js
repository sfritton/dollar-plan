import { connect } from "react-redux";

import Root from "./root";

const RootContainer = connect(store => ({
  budgets: store.budgets
}))(Root);

export default RootContainer;
