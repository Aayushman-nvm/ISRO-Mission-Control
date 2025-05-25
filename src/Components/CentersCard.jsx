import React from 'react'

function CentersCard({id, name, place, state}) {
  return (
    <div>CentersCard
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-lg font-bold mb-2">Center ID: {id}</h3>
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-700">Place: {place}</p>
            <p className="text-gray-700">State: {state}</p>
        </div>
    </div>
  )
}

export default CentersCard