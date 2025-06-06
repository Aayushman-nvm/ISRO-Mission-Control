import React, { useEffect, useState } from 'react';
import { useGetSpacecraftsQuery } from '../Redux/Services/isroStatsApi';
import DisplayCard from '../Components/DisplayCard';
import FilterTab from '../Components/FilterTab';
import Lottie from 'lottie-react';
import Loader from '../assets/loader.json';

function SpaceCraft() {
  const { data: spacecrafts, isLoading, isError } = useGetSpacecraftsQuery();
  const [allSpacecrafts, setAllSpacecrafts] = useState([]);
  const [displaySpacecrafts, setDisplaySpacecrafts] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [missionStatus, setMissionStatus] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const vehicleTypes = ['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Others'];
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

    const knownVehicles = ['PSLV', 'GSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV'];
    let filtered = [...allSpacecrafts];

    if (selectedVehicles.length) {
      const includesOthers = selectedVehicles.includes('Others');

      filtered = filtered.filter(sc => {
        const type = sc.launchVehicle.toUpperCase().trim() || '';

        const isKnown = knownVehicles.some(vehicle => type.startsWith(vehicle));

        if (includesOthers && !isKnown) return true;

        return selectedVehicles.some(selected => selected !== 'others' && type.startsWith(selected))
      });
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

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <Lottie
        animationData={Loader}
        loop={true}
        className="w-40 h-40 md:w-52 md:h-52"
      />
    </div>
  );
  if (isError) return <div className="min-h-screen flex items-center justify-center bg-black text-red-500">Error fetching spacecraft data.</div>;

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
