import {useGetSpacecraftsQuery} from '../Redux/Services/isroStatsApi'
import React, { useEffect, useState } from 'react';

function SpaceCraft() {

  const {data: spacecrafts, isLoading, isError} = useGetSpacecraftsQuery();
 const [allSpacecrafts, setAllSpacecrafts] = useState([]);
   const [displaySpacecrafts, setDisplaySpacecrafts] = useState([]);
   const [sortType, setSortType] = useState(null);
   const [selectedVehicles, setSelectedVehicles] = useState([]);
   const [missionStatus, setMissionStatus] = useState(null);
 
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
       filteredSpacecrafts = filteredSpacecrafts.filter(
         launch =>
           launch.missionStatus.toLowerCase() === missionStatus.toLowerCase()
       );
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
 
         {['GSLV', 'PSLV', 'LVM3', 'SSLV', 'SLV', 'ASLV', 'Test vehicle'].map(
           type => (
             <button
               key={type}
               onClick={() => toggleVehicle(type)}
               className={`px-4 py-2 rounded text-white ${
                 selectedVehicles.includes(type)
                   ? 'bg-green-700'
                   : 'bg-green-500'
               }`}
             >
               {type}
             </button>
           )
         )}
 
         {['MISSION SUCCESSFUL', 'LAUNCH UNSUCCESSFUL'].map(status => (
           <button
             key={status}
             onClick={() => selectMissionStatus(status)}
             className={`px-4 py-2 rounded text-white ${
               missionStatus === status ? 'bg-purple-700' : 'bg-purple-500'
             }`}
           >
             {status}
           </button>
         ))}
 
         <button
           onClick={handleReset}
           className="bg-gray-500 text-white px-4 py-2 rounded"
         >
           Reset
         </button>
       </div>
 
       <div className="space-y-2">
         {displaySpacecrafts.map(launch => (
           <div key={launch._id} className="p-2 border rounded shadow">
             <h2 className="text-lg">{launch.launchDate}</h2>
             <p className="text-sm">Type: {launch.orbitType}</p>
             <p className="text-sm">Vehicle: {launch.launchVehicle}</p>
             <p className="text-sm">Name: {launch.name}</p>
             <p className="text-sm">Status: {launch.missionStatus}</p>
           </div>
         ))}
       </div>
     </div>
   );
 }
 

export default SpaceCraft