import React from 'react';

function Footer() {
  const resourceArr = [
    { link: "https://www.isro.gov.in/", name: "ISRO" },
    { link: "https://isro.vercel.app/", name: "ISRO Vercel API source" },
    { link: "https://isrostats.in/home", name: "ISRO Statistics API source" },
    { link: "https://services.isrostats.in/api/launches", name: "Launches API" },
    { link: "https://services.isrostats.in/api/spacecraft", name: "Spacecrafts API" },
    { link: "https://isro.vercel.app/api/customer_satellites", name: "Customer Satellites API" },
    { link: "https://isro.vercel.app/api/centres", name: "Centers API" },
  ];

  return (
    <footer className="bg-[#0b0b1f] text-white border-t border-indigo-700/50 backdrop-blur-md px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        {/* Project Summary */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">ISROverse</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            ISROverse is a portal showcasing India's space achievements using open APIs.
            All data is fetched live from public sources and presented with an intuitive, modern UI.
          </p>
        </div>

        {/* Resource Links */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resourceArr.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-indigo-400 transition underline underline-offset-4"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* copyright */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} ISROverse. Built for the stars.
      </div>
    </footer>
  );
}

export default Footer;
