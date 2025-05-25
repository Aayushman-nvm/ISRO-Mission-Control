import { useGetCommercialQuery } from '../Redux/Services/isroVercelApi';
import React, { useEffect, useState } from 'react';

function Commercial() {
  const { data: commercial, isLoading, isError } = useGetCommercialQuery();
  const [allCommercial, setAllCommercial] = useState([]);
  const [displayCommercial, setDisplayCommercial] = useState([]);
  const [sortType, setSortType] = useState(null);

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
    setSelectedVehicles([]);
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Commercial Launches</h1>

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

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        {displayCommercial.map((launch, index) => (
          <div key={index} className="p-2 border rounded shadow">
            <h2 className="text-lg font-semibold">Launch ID: {launch.id}</h2>
            <p className="text-sm">Date: {launch.launch_date}</p>
            <p className="text-sm">Country: {launch.country}</p>
            <p className="text-sm">Launcher: {launch.launcher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Commercial;
