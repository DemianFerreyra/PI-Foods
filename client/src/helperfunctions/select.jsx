
//hacer un arreglo donde se mapeen todos los filtros que llegan desde el estado de searchbar, guardando solo aquellos que cumplan la condicion de no ser nulos.
//luego aplicar un filter donde se verifiquen cada uno de ellos
export const FilterBy = (event, value, recipes, frecipes) =>{
    let filteredrecipes = [];
    

    //filtrado por alfabeto
    if(event === 'alphabet'){
        if(value === 'A-Z'){
          filteredrecipes = frecipes.sort(function (a, b) {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            // a must be equal to b
            return 0
          })
        } else if(value === 'Z-A'){
          filteredrecipes = frecipes.sort(function (a, b) {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            // a must be equal to b
            return 0;
          })
        }
    }

    //filtrado por dietas
    if(event === 'diets'){
      if(value === 'All Diets'){
        filteredrecipes = recipes;
      }else{
        filteredrecipes = recipes.filter((recipe) => recipe.diets.includes(value.toLowerCase()))
      }
    }

    //filtrado por dietas
    if(event === 'score'){
      if(value === 'General score'){
        filteredrecipes = frecipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return 1;
          }
          if (a.spoonacularScore < b.spoonacularScore) {
            return -1;
          }
          // a must be equal to b
          return 0
        })
      } else if(value === 'Health score'){
        filteredrecipes = frecipes.sort(function (a, b) {
          if (a.healthScore < b.healthScore) {
            return 1;
          }
          if (a.healthScore > b.healthScore) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })
      }
    }
  
    return filteredrecipes;
}