import Actions from "../constants/actions-enum";
import Pages from "../constants/pages-enum";

export default function reducer(state = { page: Pages.BUDGET }, action) {
  switch (action.type) {
    case Actions.SET_PAGE: {
      return {
        ...state,
        page: action.payload.page
      };
    }
    default: {
      return state;
    }
  }
}
