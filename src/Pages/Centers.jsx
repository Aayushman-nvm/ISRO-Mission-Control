import { useEffect, useState } from 'react';
import { useGetCentersQuery } from '../Redux/Services/isroVercelApi';
import CentersCard from '../Components/CentersCard';

function Centers() {
  const { data: centers, isLoading, isError } = useGetCentersQuery();
  const [displayCenters, setDisplayCenters] = useState([]);

  useEffect(() => {
    if (centers) {
      setDisplayCenters(centers.centres);
    }
  }, [centers]);

  return (
    <div className="min-h-screen p-6 bg-black">
      <h1 className="text-xl font-bold text-center text-white mb-8 mt-20">
        ISRO Centers Across India
      </h1>

      {isLoading && <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>}
      {isError && <div className="text-center text-red-500">Error loading data</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCenters.map((center, index) => (
          <CentersCard
            key={index}
            id={center.id}
            name={center.Name}
            place={center.Place}
            state={center.State}
          />
        ))}
      </div>
    </div>
  );
}

export default Centers;
