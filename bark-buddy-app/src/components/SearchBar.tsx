import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

const SearchBar = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filters, setFilters] = useState({ breed: "", sort: "breed:asc" });

  useEffect(() => {
    // Fetch all breeds
    apiClient("/dogs/breeds")
      .then(setBreeds)
      .catch((error) => console.error("Error fetching breeds:", error));
  }, []);

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <select
        value={filters.breed}
        onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
        className="p-2 border rounded-md"
      >
        <option value="">Select Breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className="p-2 border rounded-md ml-4"
      >
        <option value="breed:asc">Sort by Breed (A-Z)</option>
        <option value="breed:desc">Sort by Breed (Z-A)</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
