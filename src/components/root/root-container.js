import { connect } from "react-redux";

import Root from "./root";

const RootContainer = connect(store => ({
  page: store.ui.page
}))(Root);

export default RootContainer;
