import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFindPets() {
    const filter = filters.type==="all" ? "" : `?type=${filters.type}`
    fetch(`http://localhost:3001/pets${filter}`)
    .then(r => r.json())
    .then(data => setPets(data))
  }

  function handleChangeType(typeChange) {
    setFilters({ type: typeChange })
  }

  function handleAdopt(petID) {
    const newPets = [...pets];
    const found = newPets.find(p => p.id===petID);
    const index = newPets.indexOf(found);
    newPets[index].isAdopted = true;
    setPets(newPets);
    // fetch(`http://localhost:3001/pets/${petID}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({"isAdopted": true})
    // })
    // .then(r => r.json())
    // .then(handleFindPets())
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChangeType}
              type={filters}
              onFindPetsClick={handleFindPets}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdopt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
