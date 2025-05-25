import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  const resourceArr = [{
    link: "https://www.isro.gov.in/",
    name: "ISRO"
  },{
    link:"https://isro.vercel.app/",
    name: "ISRO Vercel API source"
  },{
    link:"https://isrostats.in/home",
    name: "ISRO Statistics API source"
  }, {
    link: "https://services.isrostats.in/api/launches",
    name: "Launchers API"
  }, {
    link: "https://services.isrostats.in/api/spacecraft",
    name: "Spacecrafts API"
  }, {
    link: "https://isro.vercel.app/api/customer_satellites",
    name: "customer satellites API"
  }, {
    link: "https://isro.vercel.app/api/centres",
    name: "Centers API"
  }];
  return (
    <div>Footer
      {resourceArr.map((item, index) => (
        <NavLink key={index} to={item.link} target="_blank" rel="noopener noreferrer" className={({ isActive }) => isActive ? "active" : "inactive"}>
          {item.name}
        </NavLink>
      ))}
    </div>
  )
}

export default Footer