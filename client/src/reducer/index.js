const initialState = {
  recipes: [],
  recipe: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GetFoods":
      return {
        ...state,
        recipes: action.payload,
      };

    case "GetDetail":
      console.log('detalle', action.payload)
      return {
        ...state,
        recipe: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
