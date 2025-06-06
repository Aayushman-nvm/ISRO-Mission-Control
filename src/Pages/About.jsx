import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Loader from '../assets/loader.json';

function About() {
  const [loading, setLoading] = useState(false);
  const [gitData, setGitData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/users/Aayushman-nvm');
        const data = await res.json();
        setGitData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching github profile: ", error);
      }
    };
    getData();
  }, []);

  if (loading) {
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
  if (!gitData) return <div className="min-h-screen flex items-center justify-center bg-black text-red-500">Couldn't fetch dev data</div>;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* Glowing Animated Shape Behind Avatar */}
      <div className="absolute top-24 w-40 h-40 bg-indigo-500 blur-3xl opacity-30 rounded-full animate-pulse-slow z-0"></div>

      {/* Avatar */}
      <div className="relative z-10">
        <img
          src={gitData.avatar_url}
          alt={`${gitData.name}'s profile`}
          className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover"
        />
      </div>

      {/* Info */}
      <div className="relative z-10 mt-6 max-w-xl text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{gitData.name}</h1>
        <p className="text-gray-400">@{gitData.login}</p>

        <a
          href={gitData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-6 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          View GitHub Profile
        </a>

        {gitData.bio && <p className="text-gray-300 text-sm italic mt-2">"{gitData.bio}"</p>}

        <div className="pt-4 space-y-2 text-gray-200 text-sm sm:text-base">
          <p>
            I'm a passionate developer currently exploring the intersection of <span className="text-indigo-400">API integrated web development</span>, and space-themed UI design.
          </p>
          <p>
            This project visualizes ISRO’s milestones using public APIs, modern web architecture, and a love for all things cosmic.
          </p>
          <p>
            "Space technology in the service of humankind" – ISRO 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
