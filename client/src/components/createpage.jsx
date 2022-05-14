import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { GetAllDiets, PostRecipe } from "../actions";
import Card from "./card";

const CreatePage = () => {
  const dispatch = useDispatch();
  let actualstep = {step: ''};
  let [Errors, setErrors] = useState({
    title: 'You must add a title',
    spoonacularScore: 'The value of spoonacularScore should be one between 0-100',
    healthScore: 'The value of healthScore should be one between 0-100',
    summary: 'You must add a summary',
  });
  let [Recipe, setRecipe] = useState({
    title: '',
    summary: '',
    spoonacularScore: 0,
    healthScore: 0,
    diets: [],
    steps: [],
    image: '',
  });
  

  React.useEffect(() => {
    dispatch(GetAllDiets());
}, [dispatch])


  //validation-----------------------------------------------------------------------------------------
  function validate(e){
    if(e.target.id === 'spoonacularScore' || e.target.id === 'healthScore'){
      if(e.target.value < 0 || e.target.value > 100){
        setErrors({
          ...Errors,
          [e.target.id]: `The value of ${e.target.id} should be one between 0-100`
        })
      }else{
        setErrors({
          ...Errors,
          [e.target.id]: ''
        })
      } 
    }

    if(e.target.id === 'title' || e.target.id === 'summary'){
      if(!e.target.value.length){
        setErrors({
          ...Errors,
          [e.target.id]: `You must add a ${e.target.id}`
        })
      }else{
        setErrors({
          ...Errors,
          [e.target.id]: ''
        })
      }
    }
    if(e.target.id === 'diets'){
      if(Recipe.diets.includes(e.target.value)){
        let minus = Recipe.diets.filter((el) => el !== e.target.value)
        setRecipe({
          ...Recipe, 
          [e.target.id]: minus
      })
      }else{
        setRecipe({
          ...Recipe, 
          [e.target.id]: [...Recipe[e.target.id], e.target.value]
      })
      }
    }
  }
  //endValidation-----------------------------------------------------------------------------------------


  function handleChange(e){
    if(e.target.id === 'steps'){
        actualstep = {step: e.target.value};
    }else{
      setRecipe({
        ...Recipe, 
        [e.target.id]: e.target.value
    })
    validate(e);
    } 
  }
  function handleStep(){
    if(actualstep.length !== 0){
      setRecipe({
        ...Recipe, 
        steps: [...Recipe.steps, actualstep]
    })
    var input = document.getElementById("steps");
    input.value = '';
    alert(`Step: '${actualstep.step}' succesfully added!`) 
    actualstep = {step:''}
    }else{
      alert('Write something first...')
    }
    console.log('Step creado')
  }

  function handleSubmit(e){
    console.log(Recipe);
    e.preventDefault();
    if(Object.values(Errors).every(key => key === null || key === '')){
      dispatch(PostRecipe(Recipe));
      setRecipe({
        title: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        diets: [],
        steps: [],
        image: '',
      })
      document.getElementById("myForm").reset();
      alert('Recipe created!...')  
    }else{
      alert('Something went wrong :(...')
    }
  }

  function deleteDiet(e){
    console.log(e)
    let minus = Recipe.diets.filter((el) => el !== e.target.id)
    setRecipe({
      ...Recipe, 
      diets: minus
    })
  }

  return (
    <div className="CreatePage">
      <div className="SimpleNavBar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0'}}>
            <Link to ='/inicio'><a className="NavBarButton">Go to main page</a></Link>
      </div>
      <div className="Form">
        <form action="" onSubmit={handleSubmit} id="myForm">
          <input type="text" placeholder="Recipe name..." style={{width: '20vw'}} id="title" onChange={handleChange}/>
          <input type="text" placeholder="Image link..." style={{width: '25vw'}} id="image" onChange={handleChange}/>
          <input type="text" placeholder="Description..." style={{width: '25vw', height: '10vw'}} id="summary" onChange={handleChange}/>
            <select name="Dietselect" id="diets" defaultValue={'Select Diets...'} style={{margin: '0vw 5vw 0vw'}} onChange={handleChange}>
              <option disabled>Select Diets...</option>; 
              <option>Paleolithic</option>;
              <option>Lacto ovo vegetarian</option>;
              <option>Dairy free</option>;
              <option>Vegan</option>;
              <option>Primal</option>;
              <option>Pescatarian</option>;
              <option>Fodmap friendly</option>;
              <option>Vegetarian</option>;
              <option>Whole 30</option>;
              <option>Ketogenic</option>;
            </select>
            <div className="DietsZone">
            {
             Recipe.diets.map((diet) => (
               <div className="EachDiet" onClick={deleteDiet} >
                 <p style={{fontSize: '0.6vw'}} id= {`${diet}`}>{diet}</p>
               </div>      
             ))
            }
          </div>
          <input type="number" placeholder="Score" id="spoonacularScore" onChange={handleChange}/>
          <input type="number" placeholder="Health score" id="healthScore" onChange={handleChange}/>
          <input type="text" placeholder="Step by step..." style={{width: '25vw', height: '5vw'}} id="steps" onChange={handleChange}/>
          <div style ={{display: 'flex', flexDirection:'row', justifyContent: 'center', width: '30vw'}}>
            <button className="FormButton" type="button" onClick={handleStep}>Add step</button>
            <button className="FormButton" type="button" onClick={handleSubmit}>Create Recipe</button>
          </div>
        </form>
      </div>
      <div className="Errors" style={{width: '20vw', textAlign: 'left'}}>
        {
          Object.values(Errors).map((error) => (
            <p style={{color: 'red'}}>{error}</p>
          ))
        }
      </div>
      <div>
        <Card image ={Recipe.image} spoonacularScore ={Recipe.spoonacularScore} healthScore ={Recipe.healthScore} diets ={Recipe.diets.join(", ")} title ={Recipe.title}/>
      </div>
    </div>
  );
};
export default CreatePage;
