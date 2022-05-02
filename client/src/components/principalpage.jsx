import React from "react";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllFoods } from "../actions";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  React.useEffect(() => {
    dispatch(GetAllFoods());
  }, []);

  return (
    <div>
      {allRecipes.length === 0 ? (
        <div className="pizza" style={{ marginTop: "25%", marginLeft: "45%" }}>
          <img src={require("../icons/pizza.svg").default} alt="pizza" />
          <p>loading...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};
export default PrincipalPage;
