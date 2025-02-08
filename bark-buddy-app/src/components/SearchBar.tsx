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

  const handleBreedChange = (selected: any) => {
    const selectedBreeds = selected.map((option: any) => option.value);
    setSelectedBreeds(selectedBreeds);
    onSearch({ breeds: selectedBreeds, sort });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSort(selectedSort);
    onSearch({ breeds: selectedBreeds, sort: selectedSort });
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
          onChange={handleBreedChange}
          placeholder="Select Breeds"
          className="w-full"
        />
      </div>
      <select
        value={sort}
        onChange={handleSortChange}
        className="p-2 border rounded-md"
      >
        <option value="breed:asc">Sort by Breed (A-Z)</option>
        <option value="breed:desc">Sort by Breed (Z-A)</option>
        <option value="age:asc">Sort by Age (Youngest First)</option>
        <option value="age:desc">Sort by Age (Oldest First)</option>
      </select>
    </div>
  );
};

export default SearchBar;
