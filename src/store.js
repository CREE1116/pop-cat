function reducer(state, action) {
  if (state === undefined) {
    return {
      count: 0,
      ranking: [],
      userName: "",
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
    case "SET_USER_NAME":
      newState.userName = action.userName;
      break;
    default:
      break;
  }
  return newState;
}
export default reducer;
