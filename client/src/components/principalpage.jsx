import React, { useState } from "react";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllFoods, ResetDetail, ResetRecipes, SearchFoods, } from "../actions";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.filteredrecipes);
  const notFind = useSelector((state) => state.error);
  const [slideIndex, setSlideIndex] = useState(1);
  const [Page, setPage] = useState(0);
  let FilterBar = document.getElementById("FilterBar");

  React.useEffect(() => {
    dispatch(GetAllFoods());
    return function cleanup() {
      dispatch(ResetDetail());
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let Search = document.getElementById("Searchbar").value;
    dispatch(ResetRecipes());
    dispatch(SearchFoods(Search));
  }
  function handleClick(event) {
    console.log(event.target.id);
    console.log(event.target.value);
    if (event.target.id === "Slide") {
      if (!FilterBar) {
        FilterBar = document.getElementById("FilterBar");
      }
      if (slideIndex === 0) {
        console.log(FilterBar);
        FilterBar.style.top = 0;
        setSlideIndex(1);
      } else {
        console.log(FilterBar);
        FilterBar.style.top = "10vh";
        setSlideIndex(0);
      }
    } else if (event.target.id === "Paginate") {
      setPage(event.target.innerHTML);
    }
  }
  function handleRefresh(){
    window.location.reload();
  }
  return (
    <div>
      <div className="SimpleNavBar" style={{display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: "0", zIndex: "10", marginBottom: "5vh"}}>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <a href="#" className="NavBarButton">
            Create recipe
          </a>
        </Link>
        <a href="#" className="NavBarButton" onClick={handleClick} id="Slide">
          Filter by
        </a>
        <a href="#" className="NavBarButton" onClick={handleRefresh} id="Slide">
          Refresh all
        </a>
        {
          allRecipes.length > 1?(<h1 style={{color: 'white'}}>recetas totales= {allRecipes.length}</h1>):(console.log('no hay recetas'))
        }
        <form onSubmit={handleSubmit}>
          <input type="text" style={{ marginRight: "4vw", width: "20vw", height: "4vh" }} id="Searchbar"/>
          <img src={require("../icons/search.svg").default} alt="searchicon" style={{position: 'absolute', right: '5vw', top: '4vh'}}/>
        </form>
      </div>
      <div className="ExtendedNavBar" id="FilterBar" style={{ position: "absolute", top: "0" }}>
        <SearchBar />
      </div>
      {notFind.length === 0 ? (
        <div>
          {allRecipes.length === 0 ? (
            <div className="pizza">
              <img src={require("../icons/pizza.svg").default} alt="pizza" />
              <p>loading...</p>
            </div>
          ) : (
            <div>
              <div className="Cards">
                {allRecipes.map((recipe, index) => {
                  if (index >= 9 * Page && index <= 9 * Page + 8) {
                    console.log("estamos en", index);
                    return (
                      <Card
                        image={recipe.image}
                        title={recipe.title}
                        spoonacularScore={recipe.spoonacularScore}
                        healthScore={recipe.healthScore}
                        diets={recipe.diets.join(", ")}
                        id={recipe.id}
                      />
                    );
                  }
                })}
              </div>
              <div className="PaginateZone">
                <ul className="Paginate">
                  {[...Array(Math.ceil(allRecipes.length / 9))].map(
                    (e, index) => (
                      <button onClick={handleClick} id="Paginate" className="Page">
                        {index}
                      </button>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{marginTop: '10vw'}}>
          <h1>{notFind}</h1>
        </div>
      )}
    </div>
  );
};
export default PrincipalPage;
