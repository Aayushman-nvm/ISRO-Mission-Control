import React from 'react'
import { NavLink } from 'react-router-dom'

function CatalogCard({name,link,description,img_src}) {
  return (
    <div>
        <img src={img_src} alt={name} className='' />
        <h2>{name}</h2>
        <p>{description}</p>
        <NavLink to={link} className={({ isActive }) => isActive ? "active" : "inactive"}>
          {name} Link
        </NavLink>
        <p>Click the link above to explore more about {name}.</p>
    </div>
  )
}

export default CatalogCard