import { useGetCommercialQuery } from '../Redux/Services/isroVercelApi';
import React, { useEffect, useState } from 'react';
import CommercialCard from '../Components/CommercialCard';
import FilterTab from '../Components/FilterTab';
import Lottie from 'lottie-react';
import Loader from '../assets/loader.json';

function Commercial() {
  const { data: commercial, isLoading, isError } = useGetCommercialQuery();
  const [allCommercial, setAllCommercial] = useState([]);
  const [displayCommercial, setDisplayCommercial] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (commercial) {
      setAllCommercial(commercial.customer_satellites);
      setDisplayCommercial(commercial.customer_satellites);
    }
  }, [commercial]);

  function handleSort(order) {
    setSortType(order);
  }

  function handleReset() {
    setSortType(null);
    setDisplayCommercial(allCommercial);
  }

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    if (!allCommercial.length) return;

    let filtered = [...allCommercial];

    if (sortType) {
      filtered.sort((a, b) => {
        const dateA = parseDate(a.launch_date);
        const dateB = parseDate(b.launch_date);
        return sortType === 'Ascending' ? dateA - dateB : dateB - dateA;
      });
    }

    setDisplayCommercial(filtered);
  }, [allCommercial, sortType]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <Lottie
        animationData={Loader}
        loop={true}
        className="w-40 h-40 md:w-52 md:h-52"
      />
    </div>
  );
  if (isError) return <div className="min-h-screen flex items-center justify-center bg-black text-red-500">Error loading data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mt-20 md:mt-24 mb-4 md:text-center">Commercial Launches</h1>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <FilterTab
          handleSort={handleSort}
          toggleVehicle={() => { }}
          selectMissionStatus={() => { }}
          handleReset={handleReset}
          vehicleTypes={[]}
          selectedVehicles={[]}
          missionStatus={null}
          statusSet={null}
        />
      )}

      <div className="space-y-4">
        {displayCommercial.map((launch, index) => (
          <CommercialCard
            key={index}
            id={launch.id}
            country={launch.country}
            launchDate={launch.launch_date}
            mass={launch.mass}
            launcher={launch.launcher}
          />
        ))}
      </div>
    </div>
  );
}

export default Commercial;
