import { useDispatch } from "react-redux";

export const FilterBy = (event, value, recipes) =>{
    let filteredrecipes = [];
    if(event === 'alphabet'){
        if(value === 'A-Z'){
          recipes.sort(function (a, b) {
            if (a.title > b.title) {
              return 1;
            }
            if (b.title > a.title) {
              return -1;
            }
            return 0;
          })
        } else if(value === 'A-Z'){
          recipes.sort(function (a, b) {
            if (a.title > b.title) {
              return -1;
            }
            if (b.title > a.title) {
              return 1;
            }
            return 0;
          })
        }
    }
    if(event === 'diets'){
      filteredrecipes = recipes.filter((recipe) => recipe.diets.includes(value.toLowerCase()))
    }
    return filteredrecipes
}