import React from 'react'
import { Link } from 'react-router-dom';

function NavBlock({ title, description, to }) {
    return (
      <Link to={to} className="group p-6 bg-[#121229] rounded-2xl shadow-md hover:shadow-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
        <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 mb-2">{title}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </Link>
    );
  }

export default NavBlock