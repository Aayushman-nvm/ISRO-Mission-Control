import { useEffect, useState } from 'react';
import { useGetCentersQuery } from '../Redux/Services/isroVercelApi';
import CentersCard from '../Components/CentersCard';
import Lottie from 'lottie-react';
import Loader from '../assets/loader.json';

function Centers() {
  const { data: centers, isLoading, isError } = useGetCentersQuery();
  const [displayCenters, setDisplayCenters] = useState([]);

  useEffect(() => {
    if (centers) {
      setDisplayCenters(centers.centres);
    }
  }, [centers]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
        <Lottie
          animationData={Loader}
          loop={true}
          className="w-40 h-40 md:w-52 md:h-52"
        />
      </div>
    );
  }
  if (isError) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-red-500">Error loading data</div>
  }
  return (
    <div className="min-h-screen p-6 bg-black">
      <h1 className="text-xl font-bold text-center text-white mb-8 mt-20">
        ISRO Centers Across India
      </h1>

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
