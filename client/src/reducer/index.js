const initialState = {
  recipes: [],
  recipe: [],
  diets: [],
  filteredrecipes: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GetFoods":
      return {
        ...state,
        recipes: action.payload,
        filteredrecipes: action.payload,
      };
    case "GetDiets":
      console.log(action.payload);
      return {
        ...state,
        diets: action.payload,
      };
    case "GetDetail":
      console.log("detalle", action.payload);
      return {
        ...state,
        recipe: action.payload,
      };
    case "ResetDetail":
      return {
        ...state,
        recipe: [],
      };
    case "ResetRecipes":
      return {
        ...state,
        recipes: [],
      };
    case "FilteredFoods":
      console.log('filtered', action.payload)
      return {
        ...state,
        filteredrecipes: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
