import { connect } from "react-redux";

import Root from "./root";

const RootContainer = connect(store => ({
  page: store.page.page
}))(Root);

export default RootContainer;
