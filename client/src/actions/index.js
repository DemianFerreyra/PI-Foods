import axios from "axios";

export const GetAllFoods = () =>{
  return async function (dispatch) {
    var allfoods = await axios.get("http://localhost:3002/recipes");
    console.log(allfoods)
    dispatch({type: "GetFoods", payload: allfoods.data})
  }
}
