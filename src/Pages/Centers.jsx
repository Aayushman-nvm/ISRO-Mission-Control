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
    <div>Centers
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {displayCenters && (
        <ul className="list-disc pl-5">
          {displayCenters.map((center, index) => (
            <li key={index} className="mb-2">
              <CentersCard
                id={center.id}
                name={center.Name}
                place={center.Place}
                state={center.State}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Centers