import React, { useState } from "react";
import axios from "axios";
import { VscSearch } from "react-icons/vsc";

const Searchbar = ({ onSearchResults, showIcon = true }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchInput(query);
    if (query) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipe/search`,
          { params: { title: query } }
        );
        onSearchResults(response.data);
      } catch (error) {
        console.error("Error searching for recipes:", error);
      }
    } else {
      onSearchResults([]);
    }
  };

  return (
    <div className="form-control relative">
      <input
        type="text"
        placeholder="e.g - Panckakes, Pasta, Tacos..."
        className="input border-2 border-hotPink placeholder:text-gray-400 focus:outline-none focus:border-hotPink text-black text-xs h-[32px] lg:py-3 lg:text-base lg:h-full lg:w-[400px] w-[170px]"
        value={searchInput}
        onChange={handleSearchChange}
      />
      {showIcon && (
        <VscSearch className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-lg pointer-events-none text-hotPink"/>
      )}
    </div>
  );
};

export default Searchbar;
