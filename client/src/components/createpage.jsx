import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { GetAllDiets, PostRecipe } from "../actions";

const CreatePage = () => {
  const dispatch = useDispatch();
  
  let [Errors, setErrors] = useState({
    title: 'You must add a title',
    spoonacularScore: 'The value of spoonacularScore should be one between 0-100',
    healthScore: 'The value of healthScore should be one between 0-100',
    diets: 'You must add a diet',
  });
  let [Recipe, setRecipe] = useState({
    title: '',
    summary: '',
    spoonacularScore: 1,
    healthScore: 1,
    diets: [],
    Steps: [],
    image: '',
  });
  

  React.useEffect(() => {
    dispatch(GetAllDiets());
}, [dispatch])


  //validation
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

    if(e.target.id === 'title' || e.target.id === 'diets'){
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
  }
  
  //endValidation
  function handleChange(e){
  setRecipe({
      ...Recipe, 
      [e.target.id]: e.target.value
  })
  validate(e);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(Object.values(Errors).every(key => key === null || key === '')){
      console.log('subido correctamente')
      dispatch(PostRecipe(Recipe));
    }else{
      console.log('no se puede subir')
    }
  }
  return (
    <div className="CreatePage">
      <div className="SimpleNavBar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0'}}>
            <Link to ='/inicio'><a className="NavBarButton">Go to main page</a></Link>
          </div>
      <div className="Form">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Recipe name..." style={{width: '20vw'}} id="title" onChange={handleChange}/>
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
          <input type="number" placeholder="Score" id="spoonacularScore" onChange={handleChange}/>
          <input type="number" placeholder="Health score" id="healthScore" onChange={handleChange}/>
          <input type="text" placeholder="Step by step..." style={{width: '25vw', height: '5vw'}} id="steps" onChange={handleChange}/>
          <div></div>
          <button className="FormButton">Add step</button>
          <button className="FormButton">Create Recipe</button>
        </form>
      </div>
      <div className="Errors" style={{width: '20vw', textAlign: 'left'}}>
        {
          Object.values(Errors).map((error) => (
            <p style={{color: 'red'}}>{error}</p>
          ))
        }
      </div>
    </div>
  );
};
export default CreatePage;
