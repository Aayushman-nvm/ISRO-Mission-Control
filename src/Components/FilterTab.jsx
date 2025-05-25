import React from 'react';

function FilterTab({
  handleSort,
  toggleVehicle,
  selectMissionStatus,
  handleReset,
  vehicleTypes,
  selectedVehicles,
  missionStatus,
  statusSet
}) {
  return (
    <div className="space-x-4 mb-4 flex flex-wrap gap-2">
      <button
        onClick={() => handleSort('Ascending')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ascending Order
      </button>
      <button
        onClick={() => handleSort('Descending')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Descending Order
      </button>

      {vehicleTypes.map(type => (
        <button
          key={type}
          onClick={() => toggleVehicle(type)}
          className={`px-4 py-2 rounded text-white ${
            selectedVehicles.includes(type) ? 'bg-green-700' : 'bg-green-500'
          }`}
        >
          {type}
        </button>
      ))}

      {statusSet?.map(status => (
        <button
          key={status}
          onClick={() => selectMissionStatus(status)}
          className={`px-4 py-2 rounded text-white ${
            missionStatus === status ? 'bg-purple-700' : 'bg-purple-500'
          }`}
        >
          {status === 'SUCCESSFUL' ? 'MISSION SUCCESSFUL' : 'UNSUCCESSFUL'}
        </button>
      ))}

      <button
        onClick={handleReset}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}

export default FilterTab;
