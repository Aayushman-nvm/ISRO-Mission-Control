import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const linkArr = [
  { link: "/", name: "Home" },
  { link: "/explore", name: "Explore" },
  { link: "/dashboard", name: "Dashboard" },
  { link: "/catalog", name: "Catalog" },
  { link: "/centers", name: "Centers" },
  { link: "/about", name: "About" }
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const currentTab = linkArr.find(item => item.link === currentPath)?.name || "ISROverse";

  return (
    <>
      {/* Top nav for large screens */}
      <nav className="hidden md:flex justify-center fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 bg-[#0d0d23]/80 backdrop-blur-md border border-indigo-500 rounded-full shadow-lg space-x-8 text-white font-medium transition-all">
        {linkArr.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `transition-all duration-200 hover:text-indigo-400 ${isActive ? 'text-indigo-400 font-semibold' : ''
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm flex justify-between items-center px-5 py-3 bg-[#0d0d23]/90 backdrop-blur-md border border-indigo-500 rounded-full shadow-md text-white">
        <span className="text-base font-medium truncate">
          {currentPath === "/" ? "ISROverse" : currentTab}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 bg-[#121229] border border-gray-700 rounded-md shadow"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar on mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f0f2c] z-40 transform transition-transform duration-300 ease-in-out border-r border-indigo-600 shadow-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-700">
          <h2 className="text-white text-lg font-bold">ISROverse</h2>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-6 text-white font-medium">
          {linkArr.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-md hover:bg-indigo-700/20 transition ${isActive ? 'text-indigo-400' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default NavBar;
