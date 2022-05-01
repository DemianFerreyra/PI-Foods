const initialState = {
  recipes: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GetFoods":
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
