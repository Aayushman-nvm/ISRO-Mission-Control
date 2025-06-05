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
    <div className="mb-4">
      <div className="p-4 bg-gray-900 rounded-lg shadow-md border dark:border-gray-700 flex flex-col gap-6">

        {/* Order Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-semibold text-gray-200 w-32">Order</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSort('Ascending')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
            >
              Ascending
            </button>
            <button
              onClick={() => handleSort('Descending')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
            >
              Descending
            </button>
          </div>
        </div>

        {/* Vehicle Type Section */}
        {vehicleTypes?.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-semibold text-gray-200 w-32">Vehicle Type</span>
            <div className="flex flex-wrap gap-2">
              {vehicleTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleVehicle(type)}
                  className={`px-4 py-2 rounded-md transition text-white ${
                    selectedVehicles.includes(type)
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mission Status Section */}
        {statusSet?.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-semibold text-gray-200 w-32">Mission Status</span>
            <div className="flex flex-wrap gap-2">
              {statusSet.map(status => (
                <button
                  key={status}
                  onClick={() => selectMissionStatus(status)}
                  className={`px-4 py-2 rounded-md transition text-white ${
                    missionStatus === status
                      ? 'bg-purple-700 hover:bg-purple-800'
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                >
                  {status === 'SUCCESSFUL' ? 'MISSION SUCCESSFUL' : 'UNSUCCESSFUL'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reset Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-semibold text-gray-200 w-32">Reset</span>
          <button
            onClick={handleReset}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition"
          >
            Reset All Filters
          </button>
        </div>

      </div>
    </div>
  );
}

export default FilterTab;
