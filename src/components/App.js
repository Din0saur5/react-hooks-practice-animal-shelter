import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onChangeType = (e) => {
    setFilters({type: e.target.value})
  }
  

useEffect( ()=>{
  onFindPetsClick()
},[])


const onFindPetsClick = () => {
  let queryStr =''
  if (filters.type !== 'all'){
    queryStr = `?type=${filters.type}`
  }
  fetch(`http://localhost:3001/pets${queryStr}`)
  .then(resp=>resp.json())
  .then((data)=>{
    setPets(data)
    
  })
}



const onAdoptPet = (id) => {
  
  let  updatedPets = pets.map(pet=>{
    if(pet.id===id){
       pet.isAdopted = true
    }
    return pet
  })
  setPets(updatedPets)

  
  // fetch(`http://localhost:3001/pets/${id}`,{
  //   method:'PATCH',
  //   headers:{
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({"isAdopted":true})
  //   })
  //   .then(resp=>resp.json())
  //   .then(data=>{
      
        
        
  //   })   
  }
  




  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;