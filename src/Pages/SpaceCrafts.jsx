import React, { useEffect, useState } from 'react';
import { useGetSpacecraftsQuery } from '../Redux/Services/isroStatsApi';
import DisplayCard from '../Components/DisplayCard';
import FilterTab from '../Components/FilterTab';

function SpaceCraft() {
  const { data: spacecrafts, isLoading, isError } = useGetSpacecraftsQuery();
  const [allSpacecrafts, setAllSpacecrafts] = useState([]);
  const [displaySpacecrafts, setDisplaySpacecrafts] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [missionStatus, setMissionStatus] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const vehicleTypes = ['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Test vehicle'];
  const statusSet = ['SUCCESSFUL', 'UNSUCCESSFUL'];

  useEffect(() => {
    if (spacecrafts) {
      setAllSpacecrafts(spacecrafts);
      setDisplaySpacecrafts(spacecrafts);
    }
  }, [spacecrafts]);

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
    setDisplaySpacecrafts(allSpacecrafts);
  }

  useEffect(() => {
    if (!allSpacecrafts.length) return;

    let filtered = [...allSpacecrafts];

    if (selectedVehicles.length) {
      filtered = filtered.filter(sc =>
        selectedVehicles.some(type => sc.launchVehicle?.includes(type))
      );
    }

    if (missionStatus) {
      filtered = filtered.filter(sc => {
        const normalized = sc.missionStatus?.trim().toLowerCase();
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
      filtered.sort((a, b) => {
        const dateA = new Date(a.launchDate);
        const dateB = new Date(b.launchDate);
        return sortType === 'Ascending' ? dateA - dateB : dateB - dateA;
      });
    }

    setDisplaySpacecrafts(filtered);
  }, [allSpacecrafts, selectedVehicles, missionStatus, sortType]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching spacecraft data.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mt-20 md:mt-24 mb-4 md:text-center">Explore Spacecraft Launches</h1>

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
        {displaySpacecrafts.map(sc => (
          <DisplayCard
            key={sc._id}
            Name={sc.name}
            LaunchDate={sc.launchDate}
            LaunchType={sc.orbitType}
            MissionStatus={sc.missionStatus}
            Application={sc.application}
            OrbitType={sc.orbitType}
            LaunchVehicle={sc.launchVehicle}
            Link={sc.link}
          />
        ))}
      </div>
    </div>
  );
}

export default SpaceCraft;
