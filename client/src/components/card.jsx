import { Link } from "react-router-dom";
import React from "react";

const Card = ({image, spoonacularScore, healthScore, diets, title, id}) => {
  return (
    <div className="Card">
     <div className="imageContainer">
         <img src={`${image}`} alt="ImagenPreview" />
         <ul>
             <li style={{width: '6.5vw', height: '2vw'}}>
               <p>score: {spoonacularScore}</p>
             </li>
             <li style={{width: '10vw', height: '2vw'}}>
               <p>health score: {healthScore}</p>
             </li>
         </ul>
     </div>
     <div className="infoFood" style={{width: '100%'}}>
         <ul>
             <li style={{listStyle: 'none', fontSize: '1.5vw', fontWeight: '600', height: '5vw'}}>{title}</li>
             <li style={{listStyle: 'none', height: '4.5vw',fontSize: '1.1vw', wordBreak: 'keep-all', color: 'rgb(50,50,50)'}}>diets: {diets}</li>
             {
               id?(
               <Link to={`/recipes/${id}`} style={{textDecoration: 'none'}}>
               <li style={{listStyle: 'none', width: "100%", height: '3.5vw', backgroundColor: 'rgb(222, 76, 66)', fontSize: '2.5vw', color: "white"}} className="KnowMore">Know more</li>
               </Link>
               ) : (<li style={{listStyle: 'none', width: "100%", height: '3.5vw', backgroundColor: 'rgb(222, 76, 66)', fontSize: '2.5vw', color: "white"}} className="KnowMore">Know more</li>)
             }
             
         </ul>
     </div>
    </div>
  );
};
export default Card;