import React from "react";
import Card from "./card";
import { carta1, carta2 } from "./cartas";

const PrincipalPage = () => {
  const cartas = [carta1, carta2];
  return (
    <div>
      <div>
        {cartas?.map((carta) => (
          <Card
            img={carta.img}
            score={carta.score}
            healthscore={carta.healthscore}
            name={carta.name}
            desc={carta.desc}
            id={carta.id}
          />
        ))}
      </div>
    </div>
  );
};
export default PrincipalPage;
