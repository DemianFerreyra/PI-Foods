import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterBy } from "../helperfunctions/select.jsx";
import { ResetRecipes } from "../actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes)
  const frecipes = useSelector((state) => state.filteredrecipes)


  async function handleChange(event){
    event.preventDefault();
    console.log(event.target.value)
    let filter = await FilterBy(event.target.id, event.target.value, recipes, frecipes);
    dispatch(ResetRecipes())
    dispatch({type: "FilteredFoods", payload: filter})
  }
  return (
    <div className="FilterBar">
      <select onChange={handleChange} id="createdindb">
        <option>All</option>
        <option>API only</option>;
        <option>DATABASE only</option>;
      </select>
      <select onChange={handleChange} id="diets">
        <option>Select Diet...</option>
        <option>Paleolithic</option>;
        <option>Lacto ovo vegetarian</option>;
        <option>Dairy free</option>;
        <option>Vegan</option>;
        <option>Primal</option>;
        <option>Pescatarian</option>;
        <option>Fodmap friendly</option>;
        <option>Vegetarian</option>;
        <option>Whole 30</option>;
        <option>Ketogenic</option>;
      </select>  
      <select onChange={handleChange} id="score">
        <option>General score</option>
        <option>Health score</option>;
      </select>
      <select onChange={handleChange} id="alphabet">
        <option>A-Z</option>
        <option>Z-A</option>;
      </select>
    </div>
  )
};
export default SearchBar;
