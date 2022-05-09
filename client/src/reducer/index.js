const initialState = {
  recipes: [],
  recipe: [],
  diets: [],
  filteredrecipes: [],
  error: '',
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GetFoods":
      return {
        ...state,
        recipes: action.payload,
        filteredrecipes: action.payload,
        error: '',
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
      console.log('reseteo de recetas')
      return {
        ...state,
        filteredrecipes: [],
      };
    case "FilteredFoods":
      console.log('filtered', action.payload)
      return {
        ...state,
        filteredrecipes: action.payload,
        error: '',
      };
    case "Error":
      console.log('error', action.payload)
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
