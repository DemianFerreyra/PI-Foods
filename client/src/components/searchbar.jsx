import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterBy } from "../helperfunctions/select.jsx";
import { ResetRecipes, FilterFoods } from "../actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes)
  const frecipes = useSelector((state) => state.filteredrecipes)


  async function handleChange(event){
    event.preventDefault();
    console.log(event.target.value)
    let filter = await FilterBy(event.target.id, event.target.value, recipes, frecipes);
    dispatch(ResetRecipes())
    dispatch(FilterFoods(filter))
  }
  return (
    <div className="FilterBar">
      <select onChange={handleChange} defaultValue="Diets..." id="diets">
        <option disabled>Diets...</option>
        <option>All Diets</option>
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
      <select onChange={handleChange} defaultValue="Score..." id="score">
        {/* <option>General score</option> */}
        <option disabled>Score...</option>;
        <option>Health score</option>;
      </select>
      <select onChange={handleChange} defaultValue="Alphabetically..." id="alphabet">
        <option disabled>Alphabetically...</option>;
        <option>A-Z</option>
        <option>Z-A</option>;
      </select>
    </div>
  )
};
export default SearchBar;
