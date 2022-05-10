import axios from "axios";

export const GetAllFoods = () =>{
  return async function (dispatch) {
    const allfoods = await axios.get("http://localhost:3002/recipes");
    dispatch({type: "GetFoods", payload: allfoods.data})
  }
}

export const GetDetail = (id) =>{
  return async function (dispatch) {
    const allfoods = await axios.get(`http://localhost:3002/recipes/${id}`);
    console.log(allfoods)
    dispatch({type: "GetDetail", payload: allfoods.data})
  }
}

export const SearchFoods = (search) =>{
  return async function (dispatch) {
    try {
      const allfoods = await axios.get(`http://localhost:3002/recipes?search=${search}`);
      if(allfoods.data.length === 0){
        console.log('b',allfoods)
        dispatch({type: "Error", payload: 'We cant find what you were looking for :('})
      }else{
        console.log('a',allfoods)
        dispatch({type: "GetFoods", payload: allfoods.data})
      }  
    } catch (error) {
      dispatch({type: "Error", payload: 'We cant find what you were looking for :('})
    }
    
  }
}

export const GetAllDiets = () =>{
  return async function (dispatch) {
    const diets = await axios.get("http://localhost:3002/diets");
    dispatch({type: "GetDiets", payload: diets.data})
  }
}
export const PostRecipe = (recipe) =>{
  return async function () {
    const recipeDB = await axios.post("http://localhost:3002/recipes", recipe);
    return recipeDB
  }
}
export const FilterFoods = (filtered) =>{
  console.log('filtrado actions',filtered)
  return async function (dispatch) {
    if(filtered.length > 0){
      dispatch({type: "FilteredFoods", payload: filtered})
    }else{
      dispatch({type: "Error", payload: 'We cant find what you were looking for :('})
    }
  }
}
export const ResetDetail = function () {
  return {
    type: 'ResetDetail'
  };
};
export const ResetRecipes = function () {
  return {
    type: 'ResetRecipes'
  };
};