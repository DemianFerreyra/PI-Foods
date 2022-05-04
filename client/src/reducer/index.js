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
    case "ResetDetail":
      return{
        ...state,
        recipe: [],
      }
    case "ResetRecipes":
        return{
          ...state,
          recipes: [],
        }
    default:
      return state;
  }
}
export default rootReducer;
