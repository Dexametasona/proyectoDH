"use client";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-md max-w-screen-md">
      {/* Icono de búsqueda */}
      <svg
        className="w-5 h-5 text-gray-500 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M10 2a8 8 0 015.29 13.29l4.3 4.3a1 1 0 01-1.42 1.42l-4.3-4.3A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
      </svg>
      
      {/* Dropdown */}
      <select className="border-none bg-transparent text-gray-700 focus:ring-0 mr-2">
        <option>Todos</option>
        <option>Opción 1</option>
        <option>Opción 2</option>
      </select>

      {/* Input */}
      <input
        type="text"
        className="flex-grow focus:outline-none bg-transparent placeholder-gray-500"
        placeholder="¿Qué estás buscando?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
