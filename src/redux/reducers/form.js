const INITIAL_STATE = {
  inputs: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_FORM":
      return { ...state, inputs: action.payload };
    default:
      return state;
  }
};
