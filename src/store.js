function reducer(state, action) {
  if (state === undefined) {
    return {
      id: "",
      count: 0,
      ranking: 0,
      top10: [],
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
    case "TOP10":
      newState.top10 = action.top10;
      break;
    case "ID":
      newState.id = action.id;
      break;
    default:
      break;
  }
  return newState;
}
export default reducer;
