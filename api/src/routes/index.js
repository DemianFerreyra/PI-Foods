const { Router } = require("express");
const { getFoodInfo } = require("./recipes");
const axios = require("axios");
const {Recipe, Diet} = require("../db");
const { APIKEY, APIKEY2 } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Recetas por query
router.get("/recipes", async (req, res) => {
  let {name} = req.query;
  console.log('nombre',name)
  const recipes = await getFoodInfo();
  try {
    if (name) {   
      let filteredrecipes = await recipes.filter((food) =>
        food.title.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredrecipes.length > 1) {
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
  let {
    title,
    summary,
    spoonacularScore,
    healthScore,
    instructions,
    image,
    diets,
  } = req.body;

  let recipeCreated = await Recipe.create({
    title,
    summary,
    spoonacularScore,
    healthScore,
    instructions,
    image
  });

  let dietsDB = await Diet.findAll({
    where: { name: diets },
  });
  recipeCreated.addDiet(dietsDB);
  res.send("Receta creada correctamente");
});

//Traemos las dietas de la API y la guardamos en la db
router.get("/diets", async (req, res) => {
  const dietsAPI = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY2}&addRecipeInformation=true&number=100`
  );
  const diets = dietsAPI.data.results.map((plate) => plate.diets);
  const eachDiet = diets.flat().concat("Vegetarian", "Ketogenic");
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
