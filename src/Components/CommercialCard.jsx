import React from 'react';

function CommercialCard({ id, country, launchDate, mass, launcher }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-semibold mb-2">Launch ID: {id}</h2>
      <p className="text-sm"><span className="font-medium">Date:</span> {launchDate}</p>
      <p className="text-sm"><span className="font-medium">Country:</span> {country}</p>
      <p className="text-sm"><span className="font-medium">Mass:</span> {mass} kg</p>
      <p className="text-sm"><span className="font-medium">Launcher:</span> {launcher}</p>
    </div>
  );
}

export default CommercialCard;
