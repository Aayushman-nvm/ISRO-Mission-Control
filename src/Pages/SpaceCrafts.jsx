import { useGetSpacecraftsQuery } from '../Redux/Services/isroStatsApi'
import React, { useEffect, useState } from 'react';
import DisplayCard from '../Components/DisplayCard';
import FilterTab from '../Components/FilterTab';

function SpaceCraft() {

  const { data: spacecrafts, isLoading, isError } = useGetSpacecraftsQuery();
  const [allSpacecrafts, setAllSpacecrafts] = useState([]);
  const [displaySpacecrafts, setDisplaySpacecrafts] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [missionStatus, setMissionStatus] = useState(null);
  const vehicleTypes = ['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Test vehicle'];
  const statusSet= ['SUCCESSFUL', 'UNSUCCESSFUL'];

  useEffect(() => {
    if (spacecrafts) {
      setAllSpacecrafts(spacecrafts);
      setDisplaySpacecrafts(spacecrafts);
    }
  }, [spacecrafts]);

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
    setDisplaySpacecrafts(allSpacecrafts);
  }

  useEffect(() => {
    if (!allSpacecrafts.length) return;

    let filteredSpacecrafts = [...allSpacecrafts];

    if (selectedVehicles.length) {
      filteredSpacecrafts = filteredSpacecrafts.filter(launch =>
        selectedVehicles.some(type => launch.launchVehicle.includes(type))
      );
    }

    if (missionStatus) {
      filteredSpacecrafts = filteredSpacecrafts.filter(launch => {
        const normalized = launch.missionStatus?.trim().toLowerCase();
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

    if (sortType) {
      filteredSpacecrafts = filteredSpacecrafts.sort((a, b) => {
        const dateA = new Date(a.launchDate);
        const dateB = new Date(b.launchDate);
        return sortType === 'Ascending' ? dateA - dateB : dateB - dateA;
      });
    }

    setDisplaySpacecrafts(filteredSpacecrafts);
  }, [allSpacecrafts, selectedVehicles, missionStatus, sortType]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Spacecraft Launches</h1>

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
        {displaySpacecrafts.map(launch => (
          <DisplayCard
            key={launch._id}
            Name={launch.name}
            LaunchDate={launch.launchDate}
            LaunchType={launch.orbitType}
            MissionStatus={launch.missionStatus}
            Application={launch.application}
            OrbitType={launch.orbitType}
            LaunchVehicle={launch.launchVehicle}
            Link={launch.link}
          />
        ))}
      </div>
    </div>
  );
}


export default SpaceCraft