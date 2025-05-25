import React from 'react'

function CommercialCard({id, country, launchDate, mass, launcher}) {
  return (
    <div>Card
      <h2 className="text-lg font-semibold">Launch ID: {id}</h2>
      <p className="text-sm"><strong>Date:</strong> {launchDate}</p>
      <p className="text-sm"><strong>Country:</strong> {country}</p>
      <p className="text-sm"><strong>Mass:</strong> {mass} kg</p>
      <p className="text-sm"><strong>Launcher:</strong> {launcher}</p>
    </div>
  )
}

export default CommercialCard