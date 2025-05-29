import React from 'react';

function CentersCard({ id, name, place, state }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
        Center ID: {id}
      </h3>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        <span className="font-medium text-gray-700 dark:text-gray-200">Place:</span> {place}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        <span className="font-medium text-gray-700 dark:text-gray-200">State:</span> {state}
      </p>
    </div>
  );
}

export default CentersCard;
