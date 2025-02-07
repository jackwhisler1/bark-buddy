import { useState, useEffect } from "react";
import Select from "react-select";
import apiClient from "../utils/apiClient";

interface SearchBarProps {
  onSearch: (filters: { breeds: string[]; sort: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sort, setSort] = useState("breed:asc");

  // Fetch all breeds on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breeds = await apiClient("/dogs/breeds");
        setBreeds(breeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleSearch = () => {
    onSearch({ breeds: selectedBreeds, sort });
  };

  const breedOptions = breeds.map((breed) => ({ value: breed, label: breed }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex gap-4 items-center">
      <div className="flex-1">
        <Select
          isMulti
          options={breedOptions}
          value={breedOptions.filter((option) =>
            selectedBreeds.includes(option.value)
          )}
          onChange={(selected) =>
            setSelectedBreeds(selected.map((option) => option.value))
          }
          placeholder="Select Breeds"
          className="w-full"
        />
      </div>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="breed:asc">Sort by Breed (A-Z)</option>
        <option value="breed:desc">Sort by Breed (Z-A)</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
