function reducer(state, action) {
  if (state === undefined) {
    return {
      count: 0,
      ranking: [],
    };
  }
  const newState = { ...state };
  switch (action.type) {
    case "INCREASE":
      newState.count += 1;
      break;
    case "DECREASE":
      newState.count -= 1;
      break;
    case "RESET":
      newState.count = 0;
      break;
    case "SET":
      newState.count = action.count;
      break;
    case "RANKING":
      newState.ranking = action.ranking;
      break;
    default:
      break;
  }
  return newState;
}
export default reducer;
