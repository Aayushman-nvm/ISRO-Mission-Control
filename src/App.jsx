import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Catalog from './Pages/Catalog';
import Centers from './Pages/Centers';
import Commercial from './Pages/Commercial';
import Dashboard from './Pages/Dashboard';
import Explore from './Pages/Explore';
import Home from './Pages/Home';
import SpaceCrafts from './Pages/SpaceCrafts';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
function App() {
  /*const [apiData, setApiData] = useState([]);
  const [success, setSuccess] = useState([]);
  const [unsuccess, setUnsuccess] = useState([]);
  const [GSLV, setGSLV] = useState([]);
  const [PSLV, setPSLV] = useState([]);
  const [aesData, setAesData] = useState([]);
  const [desData, setDesData] = useState([]);

  async function call() {
    try {
      const data = await fetch('https://services.isrostats.in/api/launches');
      const response = await data.json();
      setApiData(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    call();
  }
    , []);
  useEffect(() => {
    const filteredSuccessData = apiData.filter(item => item.MissionStatus === "MISSION SUCCESSFUL");
    const filteredUnsuccessData = apiData.filter(item => item.MissionStatus === "MISSION UNSUCCESSFUL");
    setUnsuccess(filteredUnsuccessData);
    setSuccess(filteredSuccessData);
  }, [apiData]);
  console.log("API DATA", apiData);
  console.log("MISSION SUCCESSFULL", success);
  console.log("MISSION UNSUCCESSFULL", unsuccess);

  useEffect(() => {
    const filterGSLVData=apiData.filter(item=>item.LaunchType.includes("GSLV"));
    setGSLV(filterGSLVData);
    const filterPSLVData=apiData.filter(item=>item.LaunchType.includes("PSLV"));
    setPSLV(filterPSLVData);
  }
    , [apiData]);
  console.log("GSLV", GSLV);
  console.log("PSLV", PSLV);

  useEffect(() => {
    //const aesData = [...apiData].sort((a, b) => new Date(a.LaunchDate) - new Date(b.LaunchDate))
    const desData = [...apiData].sort((a, b) => new Date(b.LaunchDate) - new Date(a.LaunchDate))
    const aesData = [...desData].sort((a, b) => new Date(a.LaunchDate) - new Date(b.LaunchDate))
    setAesData(aesData);
    setDesData(desData);
  }, [apiData]);
  console.log("AES", aesData);
  console.log("DES", desData);*/

  return (
    <div>Hello
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} >
            <Route path="commercial" element={<Commercial />} />
            <Route path="spacecrafts" element={<SpaceCrafts />} />
          </Route>
          <Route path="/centers" element={<Centers />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
