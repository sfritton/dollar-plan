import Actions from "../actions/actions-enum";
import Pages from "../actions/pages-enum";

export default function reducer(
  state = { page: Pages.BUDGET, loading: false, edit: false },
  action
) {
  switch (action.type) {
    case Actions.SET_PAGE: {
      return {
        ...state,
        page: action.payload.page
      };
    }
    case Actions.SET_EDIT: {
      return {
        ...state,
        edit: action.payload.edit
      };
    }
    default: {
      return state;
    }
  }
}
