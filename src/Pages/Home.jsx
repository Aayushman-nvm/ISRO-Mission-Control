import React from 'react';
import SplineScene from '../Components/SplineScene';
import NavBlock from '../Components/NavBlock';

function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Fixed */}
      <div className="fixed inset-0 z-0">
        <SplineScene />
      </div>

      {/* Scrollable */}
      <div className="relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center h-screen px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg">
            Welcome to ISROverse
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300">
            Dive into a galactic data journey showcasing India's achievements in space exploration.
            Explore spacecrafts, missions, commercial ventures, and more—powered by the ISRO APIs.
          </p>
          <div className="mt-12 animate-bounce text-sm text-gray-500">
            Scroll to explore ↓
          </div>
        </section>

        {/* Navigation Blocks */}
        <section className="px-6 pb-64 max-w-7xl mx-auto">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <NavBlock title="Explore Missions" to="/explore" description="Track past and present missions, launch stats, and key milestones." />
            <NavBlock title="Spacecrafts Catalog" to="/spacecrafts" description="Browse through ISRO's rich fleet of satellites and spacecrafts." />
            <NavBlock title="Commercial Ventures" to="/commercial" description="Explore ISRO’s commercial collaborations and service catalog." />
            <NavBlock title="Statistics Dashboard" to="/dashboard" description="Visualize space data, analyze trends, and understand impact." />
            <NavBlock title="ISRO Centers" to="/centers" description="Get detailed insights into ISRO’s regional centers and research hubs." />
            <NavBlock title="About ISROverse" to="/about" description="Learn about the vision behind this project and the APIs used." />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
