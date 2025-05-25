import { useEffect,useState } from 'react';
import {useGetCentersQuery} from '../Redux/Services/isroVercelApi';

function Centers() {
  const {data: centers, isLoading, isError} = useGetCentersQuery();
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
              <h2 className="font-bold">{center.name}</h2>
              <p>{center.Place}</p>
              <p>{center.State}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Centers