import React, { useEffect, useState } from 'react'
import { useGetLaunchesQuery } from '../Redux/Services/isroStatsApi'

function Explore() {
  const { data: launches, isLoading, isError } = useGetLaunchesQuery();
  const [allLaunches, setAllLaunches] = useState([]);
  const [launchData, setLaunchData] = useState([]);
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    if (launches) {
      setAllLaunches(launches);
      setLaunchData(launches);
    }
  }, [launches]);

  function handleSort(order) {
    setSortType(order);
    const sorted = [...launchData].sort((a, b) =>
      order === "Ascending"
        ? new Date(a.LaunchDate) - new Date(b.LaunchDate)
        : new Date(b.LaunchDate) - new Date(a.LaunchDate)
    );
    setLaunchData(sorted);
  }

  function handleFilter(vehicle) {
    const filtered = allLaunches.filter(item =>
      item.LaunchType.includes(vehicle)
    );
    const sorted = sortType
      ? [...filtered].sort((a, b) =>
        sortType === "Ascending"
          ? new Date(a.LaunchDate) - new Date(b.LaunchDate)
          : new Date(b.LaunchDate) - new Date(a.LaunchDate)
      )
      : filtered;

    setLaunchData(sorted);
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Explore Launches</h1>
      <div className="space-x-4 mb-4 flex flex-wrap gap-2">
        <button onClick={() => handleSort("Ascending")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ascending Order
        </button>
        <button onClick={() => handleSort("Descending")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Descending Order
        </button>

        {["GSLV", "PSLV", "LVM3", "SSLV", "SLV", "ASLV", "Test vehicle"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {type}
          </button>
        ))}

        <button onClick={() => setLaunchData(allLaunches)} className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
      <div className="space-y-2">
        {launchData.map((launch) => (
          <div key={launch.UUID} className="p-2 border rounded shadow">
            <h2 className="text-lg">{launch.LaunchDate}</h2>
            <p className="text-sm">Type: {launch.LaunchType}</p>
            <p className="text-sm">Name: {launch.Name}</p>
            <p className="text-sm">Status: {launch.MissionStatus}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore;
