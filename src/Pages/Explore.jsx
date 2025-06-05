import React, { useEffect, useState } from 'react';
import { useGetLaunchesQuery } from '../Redux/Services/isroStatsApi';
import DisplayCard from '../Components/DisplayCard';
import FilterTab from '../Components/FilterTab';

function Explore() {
  const { data: launches, isLoading, isError } = useGetLaunchesQuery();
  const [allLaunches, setAllLaunches] = useState([]);
  const [displayLaunches, setDisplayLaunches] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [missionStatus, setMissionStatus] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const vehicleTypes = ['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Others'];
  const statusSet = ['SUCCESSFUL', 'UNSUCCESSFUL'];

  useEffect(() => {
    if (launches) {
      setAllLaunches(launches);
      setDisplayLaunches(launches);
    }
  }, [launches]);

  function toggleVehicle(vehicle) {
    setSelectedVehicles(prev =>
      prev.includes(vehicle) ? prev.filter(v => v !== vehicle) : [...prev, vehicle]
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
  
    const knownVehicles = ['PSLV', 'GSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV'];
    let filteredLaunches = [...allLaunches];
  
    if (selectedVehicles.length) {
      const includesOthers = selectedVehicles.includes("Others");
  
      filteredLaunches = filteredLaunches.filter(launch => {
        const type = launch.LaunchType?.toUpperCase().trim();
  
        const isKnown = knownVehicles.some(vehicle => type.startsWith(vehicle));
  
        if (includesOthers && !isKnown) return true;
  
        return selectedVehicles.some(selected => selected !== "Others" && type.startsWith(selected));
      });
    }
  
    if (missionStatus) {
      filteredLaunches = filteredLaunches.filter(launch => {
        const normalized = launch.MissionStatus?.trim().toLowerCase();
        if (missionStatus === 'SUCCESSFUL') {
          return normalized === 'mission successful';
        } else {
          return (
            normalized === 'mission unsuccessful' ||
            normalized === 'launch unsuccessful'
          );
        }
      });
    }
  
    if (sortType) {
      filteredLaunches.sort((a, b) => {
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
      <h1 className="text-xl font-bold mt-20 md:mt-24 mb-4 md:text-center">Explore Launches</h1>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <FilterTab
          handleSort={handleSort}
          toggleVehicle={toggleVehicle}
          selectMissionStatus={selectMissionStatus}
          handleReset={handleReset}
          vehicleTypes={vehicleTypes}
          selectedVehicles={selectedVehicles}
          missionStatus={missionStatus}
          statusSet={statusSet}
        />
      )}

      <div className="space-y-4">
        {displayLaunches.map(launch => (
          <DisplayCard
            key={launch.UUID}
            Name={launch.Name}
            LaunchDate={launch.LaunchDate}
            LaunchType={launch.LaunchType}
            Payload={launch.Payload}
            Link={launch.Link}
            MissionStatus={launch.MissionStatus}
            LaunchVehicle={launch.LaunchVehicle}
            OrbitType={launch.OrbitType}
            Application={launch.Application}
          />
        ))}
      </div>
    </div>
  );
}

export default Explore;
