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
    const allfoods = await axios.get(`http://localhost:3002/recipes?search=${search}`);
    dispatch({type: "GetFoods", payload: allfoods.data})
  }
}

export const GetAllDiets = () =>{
  return async function (dispatch) {
    const diets = await axios.get("http://localhost:3002/diets");
    dispatch({type: "GetDiets", payload: diets.data})
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