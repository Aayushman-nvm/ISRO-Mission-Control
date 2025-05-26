import React from 'react';
import { NavLink } from 'react-router-dom';

function CatalogCard({ name, link, description, img_src }) {
  return (
    <div className="relative bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-[1.02] hover:shadow-xl">
      
      <div className="relative">
        <img 
          src={img_src} 
          alt={name} 
          className="w-full h-52 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">{name}</h2>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-md mb-4">
          {description}
        </p>
        
        <NavLink
          to={link}
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition"
        >
          Explore {name}
        </NavLink>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Click the button above to dive deeper into {name}.
        </p>
      </div>
    </div>
  );
}

export default CatalogCard;
