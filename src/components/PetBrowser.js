import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  return <div className="ui cards">
    {pets.map(p => <Pet key={p.id} pet={p} onAdoptPet={onAdoptPet} />)}
  </div>;
}

export default PetBrowser;
