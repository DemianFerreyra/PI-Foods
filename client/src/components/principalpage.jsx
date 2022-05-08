import React, {useState} from "react";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllFoods, ResetDetail, ResetRecipes, SearchFoods } from "../actions";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import { $CombinedState } from "redux";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.filteredrecipes);
  const [slideIndex, setSlideIndex] = useState(1);
  let FilterBar = document.getElementById("FilterBar");


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
  function handleClick() {
    if (!FilterBar) {
      FilterBar = document.getElementById("FilterBar");
    }

    if (slideIndex === 0) {
      console.log(FilterBar)
      FilterBar.style.top = 0;
      setSlideIndex(1);
    } else {
      console.log(FilterBar)
      FilterBar.style.top = '10vh';
      setSlideIndex(0);
    }
  }

  return (
    <div>
       <div className="SimpleNavBar" style={{display: "flex", alignItems: "center", justifyContent: 'space-between', position: 'sticky', top: '0', zIndex: '10', marginBottom: '5vh'}}>
            <Link to="/create">
              <a href="#" className="NavBarButton">Create recipe</a>
            </Link>
              <a href="#" className="NavBarButton" onClick={handleClick}>Filter by</a>
              <form onSubmit={handleSubmit}>
                <input  type="text" style={{marginRight: '4vw', width: '20vw', height: '4vh'}} id="Searchbar"/>
              </form>
          </div>
          <div className="ExtendedNavBar" id="FilterBar" style={{ position: 'absolute', top: '0'}}>
           <SearchBar/>
          </div>
      {allRecipes.length === 0 ? (
        <div className="pizza">
          <img src={require("../icons/pizza.svg").default} alt="pizza" />
          <p>loading...</p>
        </div>
      ) : (
        <div>
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
