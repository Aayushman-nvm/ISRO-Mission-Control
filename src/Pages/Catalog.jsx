import React from 'react'
import { useNavigate } from 'react-router-dom'

function Catalog() {

  const navigate = useNavigate();
  function handleNavigate(type) {
    type === "spacecrafts" ? navigate("/catalog/spacecrafts") : navigate("/catalog/commercial");
  }

  return (
    <div>Catalog
      
        <button onClick={() => handleNavigate("spacecrafts")}>Spacecrafts link</button>
        <button onClick={() => handleNavigate("commercial")}>Commercial link</button>
      
    </div>
  )
}

export default Catalog