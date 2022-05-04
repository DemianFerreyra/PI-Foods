import React from "react";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllFoods, ResetDetail, ResetRecipes, SearchFoods } from "../actions";
import { Link } from "react-router-dom";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  React.useEffect(() => {
    dispatch(GetAllFoods());
    return function cleanup() {
      dispatch(ResetDetail());
    };
  }, []);
  function handleSubmit(e){
    e.preventDefault();
    let Search = document.getElementById("Searchbar").value;
    dispatch(ResetRecipes())
    dispatch(SearchFoods(Search));
  }

  return (
    <div>
      {allRecipes.length === 0 ? (
        <div className="pizza" style={{ marginTop: "25%", marginLeft: "45%" }}>
          <img src={require("../icons/pizza.svg").default} alt="pizza" />
          <p>loading...</p>
        </div>
      ) : (
        <div>
          <div className="SimpleNavBar" style={{display: "flex", alignItems: "center", justifyContent: 'space-between',}}>
            <Link to="/Create">
              <a href="#" className="NavBarButton">
                Create recipe
              </a>
            </Link>
              <a href="#" className="NavBarButton">
                Filter by
              </a>
              <form onSubmit={handleSubmit}>
                <input  type="text" style={{marginRight: '4vw', width: '20vw', height: '4vh'}} id="Searchbar"/>
              </form>
              
          </div>
          <div className="Cards">
            {allRecipes?.map((recipe) => (
              <Card
                image={recipe.image}
                title={recipe.title}
                spoonacularScore={recipe.spoonacularScore}
                healthScore={recipe.healthScore}
                diets={recipe.diets.join(", ")}
                id={recipe.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default PrincipalPage;
