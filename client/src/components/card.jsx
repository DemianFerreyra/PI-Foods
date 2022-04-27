import { Link } from "react-router-dom";
import React from "react";

const Card = ({img, score, healthscore, desc, name, id}) => {
  return (
    <div className="Card">
     <div className="imageContainer">
         <img src={img} alt="ImagenPreview" />
         <ul style={{width: '100%'}}>
             <li style={{height: '2vw', fontSize: '1vw', listStyle: 'none'}}>score: {score}</li>
             <li style={{height: '2vw', fontSize: '1vw', listStyle: 'none'}}>health score: {healthscore}</li>
         </ul>
     </div>
     <div className="infoFood">
         <ul>
             <li style={{listStyle: 'none'}}>{name}</li>
             <li style={{listStyle: 'none'}}>{desc}</li>
             <li style={{listStyle: 'none'}} className="KnowMore"></li>
         </ul>
     </div>
    </div>
  );
};
export default Card;