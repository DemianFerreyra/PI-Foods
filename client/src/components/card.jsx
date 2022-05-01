import { Link } from "react-router-dom";
import React from "react";

const Card = ({image, spoonacularScore, healthScore, summary, title, id}) => {
  return (
    <div className="Card">
     <div className="imageContainer">
         <img src={image} alt="ImagenPreview" />
         <ul>
             <li style={{width: '8vw'}}>score: {spoonacularScore}</li>
             <li style={{width: '13vw'}}>health score: {healthScore}</li>
         </ul>
     </div>
     <div className="infoFood">
         <ul style={{height: '28vw'}}>
             <li style={{listStyle: 'none', fontSize: '2vw', fontWeight: '600', height: '6vw'}}>{title}</li>
             <li style={{listStyle: 'none', fontSize: '1.5vw', overflow: 'hidden' ,height: '18vw'}}>{summary}</li>
               <Link to={`/recipes/${id}`}>
               <li style={{listStyle: 'none', width: "100%", height: '4vw', backgroundColor: 'blue', fontSize: '2.5vw', color: "white"}} className="KnowMore">Know more</li>
               </Link>
         </ul>
     </div>
    </div>
  );
};
export default Card;