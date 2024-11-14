"use client";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-md max-w-screen-md">
      {/* Icono de búsqueda */}
      <Search size={20} />
      
      {/* Dropdown */}
      <select className="border-none bg-transparent px-2 text-gray-700 focus:ring-0 mr-2">
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
