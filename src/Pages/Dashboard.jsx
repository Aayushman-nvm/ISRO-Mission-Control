import { useEffect, useState } from 'react';
import { useGetLaunchesQuery } from '../Redux/Services/isroStatsApi';
import { useGetSpacecraftsQuery } from '../Redux/Services/isroStatsApi';
import { DataPieChart } from '../Components/Charts/DataPieChart';
import { DataBarChart } from '../Components/Charts/DataBarChart';
import { DataYearChart } from '../Components/Charts/DataYearChart';

function Dashboard() {

  const { data: launchesData, isLoading: launchesLoading, isError: launchesError } = useGetLaunchesQuery();
  const { data: spaceCraftData, isLoading: spaceCraftLoading, isError: spaceCraftError } = useGetSpacecraftsQuery();

  const vehicles = ["GSLV", "PSLV", "LVM3", "SSLV", "SLV", "ASLV", "Others"];
  const knownVehicles = ["GSLV", "PSLV", "LVM3", "SSLV", "SLV", "ASLV"];

  const [launchVehicleCount, setLaunchVehicleCount] = useState({
    GSLV: null, PSLV: null, LVM3: null, SSLV: null, SLV: null, ASLV: null, Others: null,
  });
  const [spaceCraftCount, setSpaceCraftCount] = useState({
    GSLV: null, PSLV: null, LVM3: null, SSLV: null, SLV: null, ASLV: null, Others: null,
  });
  const [launchSuccessData, setLaunchSuccessData] = useState({
    GSLV: null, PSLV: null, LVM3: null, SSLV: null, SLV: null, ASLV: null, Others: null,
  });
  const [spacecraftSuccessData, setSpacecraftSuccessData] = useState({
    GSLV: null, PSLV: null, LVM3: null, SSLV: null, SLV: null, ASLV: null, Others: null,
  });
  const [launchesPerYearData, setLaunchesPerYearData] = useState([]);

  function getTotalLaunchVehicle(vehicle) {
    if (!launchesData) return;

    const count = launchesData.filter((launch) => {
      const type = launch.LaunchType?.toLowerCase().trim() || '';

      const isKnown = knownVehicles.some((v) => type.startsWith(v.toLowerCase()));
      const isTarget = vehicle.toLowerCase();

      const includesOthers = isTarget === 'others';

      if (includesOthers && !isKnown) return true;

      if (!includesOthers && type.startsWith(isTarget)) return true;

      return false;
    }).length;

    setLaunchVehicleCount(prev => ({ ...prev, [vehicle]: count }));
  }

  function getTotalSpaceCrafts(vehicle) {
    if (!spaceCraftData) return;

    const count = spaceCraftData.filter((craft) => {
      const type = craft.launchVehicle?.toLowerCase().trim() || '';

      const isKnown = knownVehicles.some((v) => type.startsWith(v.toLowerCase()));
      const isTarget = vehicle.toLowerCase();

      const includesOthers = isTarget === 'others';

      if (includesOthers && !isKnown) return true;

      if (!includesOthers && type.startsWith(isTarget)) return true;

      return false;
    }
    ).length;

    setSpaceCraftCount(prev => ({ ...prev, [vehicle]: count }));
  }

  function getSuccessfulLaunchMission(vehicle) {
    if (!launchesData) return;

    const isOthers = vehicle.toLowerCase() === 'others';

    const count = launchesData.filter((launch) => {
      const type = launch.LaunchType?.toLowerCase().trim() || '';
      const status = launch.MissionStatus?.trim().toLowerCase();

      const isSuccess = status === 'mission successful';
      const isKnown = knownVehicles.some((v) => type.startsWith(v.toLowerCase()));

      return (
        isSuccess &&
        (
          (isOthers && !isKnown) ||
          (!isOthers && type.startsWith(vehicle.toLowerCase()))
        )
      );
    }).length;

    setLaunchSuccessData((prev) => ({ ...prev, [vehicle]: count }));
  }


  function getSuccessfulSpaceCraftMission(vehicle) {
    if (!spaceCraftData) return;

    const isOthers = vehicle.toLowerCase() === 'others';
    const count = spaceCraftData.filter((craft) => {
      const type = craft.launchVehicle?.toLowerCase().trim() || '';
      const status = craft.missionStatus?.trim().toLowerCase();

      const isSuccess = status === 'mission successful';
      const isKnown = knownVehicles.some((v) => type.startsWith(v.toLowerCase()));

      return (
        isSuccess &&
        (
          (isOthers && !isKnown) ||
          (!isOthers && type.startsWith(vehicle.toLowerCase()))
        )
      );
    }).length;
    setSpacecraftSuccessData((prev) => ({ ...prev, [vehicle]: count }));
  }

  useEffect(() => {
    if (!launchesData || !spaceCraftData) return;

    vehicles.forEach((vehicle) => {
      getTotalLaunchVehicle(vehicle);
      getTotalSpaceCrafts(vehicle);
      getSuccessfulLaunchMission(vehicle);
      getSuccessfulSpaceCraftMission(vehicle);
    });
  }, [launchesData, spaceCraftData]);

  useEffect(() => {
    if (!launchesData) return;

    const yearMap = {};

    launchesData.forEach((launch) => {
      const year = new Date(launch.LaunchDate).getFullYear();
      const vehicle = vehicles.find((v) => launch.Name?.startsWith(v));

      if (!vehicle) return;

      if (!yearMap[year]) yearMap[year] = {};
      if (!yearMap[year][vehicle]) yearMap[year][vehicle] = 0;
      yearMap[year][vehicle]++;
    });

    const formattedData = Object.entries(yearMap).map(([year, vehicleCounts]) => ({
      year,
      ...vehicleCounts,
    }));

    setLaunchesPerYearData(formattedData);
  }, [launchesData]);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center mt-20 md:mt-24">ISRO Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <DataPieChart title="Launches" data={launchVehicleCount} />
        <DataPieChart title="Spacecrafts" data={spaceCraftCount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <DataBarChart title="Successful Launches" data={launchSuccessData} />
        <DataBarChart title="Successful Spacecrafts" data={spacecraftSuccessData} />
      </div>
      <div className="mt-8">
        <DataYearChart data={launchesPerYearData} />
      </div>
    </div>
  )

}

export default Dashboard