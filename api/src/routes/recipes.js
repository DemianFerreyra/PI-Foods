const axios = require("axios");
const {Recipe, Diet} = require('../db');
const { APIKEY } = process.env; 


const getApiData = async () =>{
    const URL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
    try {
        const data = await URL.data.results.map(plate => {
            return{
              spoonacularScore: plate.spoonacularScore,
              healthScore : plate.healthScore,
              id: plate.id,
              title: plate.title,
              image: plate.image,
              diets: plate.diets,
              summary: plate.summary,
              steps: plate.analyzedInstructions[0]?.steps
            }
          })
          return data 
    } catch (error) {
       console.log(error) 
    }
   
}

const getDBData = async () =>{
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }
    })
}

const getFoodInfo = async () =>{
    const apiInfo = await getApiData();
    const dbInfo = await getDBData();
    const total = apiInfo.concat(dbInfo);
    return total
}
module.exports = {getApiData, getDBData, getFoodInfo}