import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  const linkArr = [{
    link: "/",
    name: "Home"
  }, {
    link: "/catalog",
    name: "Catalog"
  }, {
    link: "/centers",
    name: "Centers"
  }, {
    link: "/explore",
    name: "Explore"
  }, {
    link: "/dashboard",
    name: "Dashboard"
  }];
  return (
    <div>NavBar
      {linkArr.map((item, index) => (
        <NavLink key={index} to={item.link} className={({ isActive }) => isActive ? "active" : "inactive"}>
          {item.name}
        </NavLink>
      ))}
    </div>
  )
}

export default NavBar