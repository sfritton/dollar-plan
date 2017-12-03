import Actions from "../actions/actions-enum";
import DateService from "../services/date-service";

export default function reducer(
  state = {
    budgets: [],
    loading: false
  },
  action
) {
  switch (action.type) {
    case Actions.GET_ALL_BUDGETS:
      return {
        ...state,
        budgets: action.payload.map(budget => ({
          date: DateService.decodeDate(budget),
          loaded: false
        }))
      };
    case Actions.GET_BUDGET:
      const { month, year } = action.payload.date;
      const otherBudgets = state.budgets.filter(
        budget => budget.date.month !== month && budget.date.year !== year
      );
      return {
        ...state,
        budgets: otherBudgets.concat({ ...action.payload, loaded: true })
      };
    default:
      return state;
  }
}
