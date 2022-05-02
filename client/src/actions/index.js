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