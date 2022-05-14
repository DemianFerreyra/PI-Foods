const { Router } = require("express");
const { getFoodInfo } = require("./recipes");
const axios = require("axios");
const {Recipe, Diet} = require("../db");
const { APIKEY, APIKEY2, APIKEY3, APIKEY4, APIKEY5, APIKEY6 } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Recetas
router.get("/recipes", async (req, res) => {
  const name =  req.query;  //localhost:3000/recipes?search={name viene de aca}
  const recipes = await getFoodInfo();
  try {
    if (name.search) {   
      let filteredrecipes = await recipes.filter(food =>
        food.title.toLowerCase().includes(name.search.toLowerCase()));
      if (filteredrecipes.length >= 1) {
        res.status(200).send(filteredrecipes);
      } else {
        res.status(404).send("No encontramos ese platillo");
      }
    } else {
      res.status(200).send(recipes);
    }
  } catch (error) {
    console.log(error);
  }
});

//Receta por id
router.get("/recipes/:id", async (req, res) =>{
  const id = req.params.id; 
  const totalRecipes = await getFoodInfo();
  if(id){
    let recipeByID = await totalRecipes.filter(plate => plate.id == id)

    if(recipeByID){
      res.status(200).send(recipeByID)
    }else{
      res.status(404).send("We cant find that recipe")
    }
  }
})

//Creacion de receta
router.post("/recipes", async (req, res) => {
  console.log('request', req.body);
  let {
    title,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    diets,
    dishTypes,
  } = req.body;

  let recipeCreated = await Recipe.create({
    title,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    dishTypes,
  });

  diets.forEach(async (e) => {
    let dietsDB = await Diet.findAll({
      where: { name: e.toLowerCase() },
    });
    await recipeCreated.addDiets(dietsDB);
  });
  console.log('response', recipeCreated);
  res.json(recipeCreated);
});

//Traemos las dietas de la API y la guardamos en la db
router.get("/diets", async (req, res) => {
  const dietsAPI = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY2}&addRecipeInformation=true&number=100`
  );
  const diets = dietsAPI.data?.results.map((plate) => plate.diets);
  const eachDiet = diets.flat().concat("vegetarian", "ketogenic");
  const allDiet = [...new Set(eachDiet)];

  for (const diet in allDiet) {
    Diet.findOrCreate({
      where: { name: allDiet[diet] },
    });
  }
  const allDiets = await Diet.findAll();
  res.send(allDiets);
});

module.exports = router;
