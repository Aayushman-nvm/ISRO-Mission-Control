import { Route, Routes } from 'react-router-dom';
import Catalog from './Pages/Catalog';
import Centers from './Pages/Centers';
import Commercial from './Pages/Commercial';
import Dashboard from './Pages/Dashboard';
import Explore from './Pages/Explore';
import Home from './Pages/Home';
import SpaceCrafts from './Pages/SpaceCrafts';
import About from './Pages/About';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans">
      <header className="z-50">
        <NavBar />
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/commercial" element={<Commercial />} />
          <Route path="/catalog/spacecrafts" element={<SpaceCrafts />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
