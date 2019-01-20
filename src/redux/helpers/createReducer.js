const createReducer = (actionHandlers = {}, initialState = {}) => (
  state = initialState,
  { type, payload } = {}
) => {
  const handler = actionHandlers[type];

  if (!handler) return state;

  return handler(state, payload);
};

export default createReducer;
