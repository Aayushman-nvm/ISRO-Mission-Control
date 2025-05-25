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
  const vehicleTypes = ['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Test vehicle'];
  const statusSet= ['SUCCESSFUL', 'UNSUCCESSFUL'];

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

    // Vehicle filter
    if (selectedVehicles.length) {
      filteredLaunches = filteredLaunches.filter(launch =>
        selectedVehicles.some(type => launch.LaunchType.includes(type))
      );
    }

    // Mission status filter (unifies failure labels)
    if (missionStatus) {
      filteredLaunches = filteredLaunches.filter(launch => {
        const normalized = launch.MissionStatus?.trim().toLowerCase();
        if (missionStatus === 'SUCCESSFUL') {
          return normalized === 'mission successful';
        } else if (missionStatus === 'UNSUCCESSFUL') {
          return (
            normalized === 'mission unsuccessful' ||
            normalized === 'launch unsuccessful'
          );
        }
        return true;
      });
    }

    // Sort by date
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
      <h1 className="text-xl font-bold mb-4">Explore Launches</h1>

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

      <div className="space-y-2">
        {displayLaunches.map(launch => (
          <DisplayCard
            key={launch.UUID}
            Name={launch.Name}
            LaunchDate={launch.LaunchDate}
            LaunchType={launch.LaunchType}
            Payload={launch.Payload}
            Link={launch.Link}
            MissionStatus={launch.MissionStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default Explore;
