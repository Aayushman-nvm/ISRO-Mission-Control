import React, { useEffect, useState } from 'react';
import { useGetLaunchesQuery } from '../Redux/Services/isroStatsApi';

function Explore() {
  
  const { data: launches, isLoading, isError } = useGetLaunchesQuery();
  const [allLaunches, setAllLaunches] = useState([]);
  const [displayLaunches, setDisplayLaunches] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [missionStatus, setMissionStatus] = useState(null);

  useEffect(() => {
    if (launches) {
      setAllLaunches(launches);
      setDisplayLaunches(launches);
    }
  }, [launches]);

  function toggleVehicle(vehicle) {
    setSelectedVehicles(prev =>
      prev.includes(vehicle)
        ? prev.filter(v => v !== vehicle)
        : [...prev, vehicle]
    );
  }

  function selectMissionStatus(status) {
    setMissionStatus(prev => (prev === status ? null : status));
  }

  function handleSort(order) {
    setSortType(order);
  }

  function handleReset() {
    setSelectedVehicles([]);
    setMissionStatus(null);
    setSortType(null);
    setDisplayLaunches(allLaunches);
  }

  useEffect(() => {
    if (!allLaunches.length) return;

    let filteredLaunches = [...allLaunches];

    if (selectedVehicles.length) {
      filteredLaunches = filteredLaunches.filter(launch =>
        selectedVehicles.some(type => launch.LaunchType.includes(type))
      );
    }

    if (missionStatus) {
      filteredLaunches = filteredLaunches.filter(
        launch =>
          launch.MissionStatus.toLowerCase() === missionStatus.toLowerCase()
      );
    }

    if (sortType) {
      filteredLaunches = filteredLaunches.sort((a, b) => {
        const dateA = new Date(a.LaunchDate);
        const dateB = new Date(b.LaunchDate);
        return sortType === 'Ascending' ? dateA - dateB : dateB - dateA;
      });
    }

    setDisplayLaunches(filteredLaunches);
  }, [allLaunches, selectedVehicles, missionStatus, sortType]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Explore Launches</h1>

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

        {['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Test vehicle'].map(
          type => (
            <button
              key={type}
              onClick={() => toggleVehicle(type)}
              className={`px-4 py-2 rounded text-white ${
                selectedVehicles.includes(type)
                  ? 'bg-green-700'
                  : 'bg-green-500'
              }`}
            >
              {type}
            </button>
          )
        )}

        {['MISSION SUCCESSFUL', 'MISSION UNSUCCESSFUL'].map(status => (
          <button
            key={status}
            onClick={() => selectMissionStatus(status)}
            className={`px-4 py-2 rounded text-white ${
              missionStatus === status ? 'bg-purple-700' : 'bg-purple-500'
            }`}
          >
            {status}
          </button>
        ))}

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        {displayLaunches.map(launch => (
          <div key={launch.UUID} className="p-2 border rounded shadow">
            <h2 className="text-lg">{launch.LaunchDate}</h2>
            <p className="text-sm">Type: {launch.LaunchType}</p>
            <p className="text-sm">Name: {launch.Name}</p>
            <p className="text-sm">Status: {launch.MissionStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
