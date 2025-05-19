import React from 'react'
import {Outlet} from 'react-router-dom'

function Catalog() {
  return (
    <div>Catalog
      <Outlet/>
    </div>
  )
}

export default Catalog