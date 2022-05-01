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
      <div className="Cards">
        {allRecipes?.map((recipe) => (
          <Card
            image={recipe.image}
            title={recipe.title}
            spoonacularScore={recipe.spoonacularScore}
            healthScore={recipe.healthScore}
            summary ={recipe.summary}
            id ={recipe.id}
          />
        ))}
      </div>
    </div>
  );
};
export default PrincipalPage;
