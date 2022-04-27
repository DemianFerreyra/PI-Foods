const { Router } = require('express');
const {getFoodInfo, getApiInfo, getDBData} = require('./recipes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req,res) =>{
    let { name } = req.query;
    const recipes = await getFoodInfo();
    try {
        if(name){
            let filteredrecipes = await recipes.filter(food => food.title.toLowerCase().includes(name.toLowerCase()))
      
            if(filteredrecipes.length > 1){res.status(200).send(filteredrecipes)}
            else{ res.status(404).send('No encontramos ese platillo')}
          }else{
            res.status(200).send(recipes);
          }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;