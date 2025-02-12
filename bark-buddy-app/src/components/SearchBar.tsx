import { useState, useEffect } from "react";
import Select from "react-select";
import apiClient from "../utils/apiClient";
import "../styling/styles.css";

interface SearchBarProps {
  onSearch: (filters: {
    breeds: string[];
    zipCode: string;
    ageMin: number | undefined;
    ageMax: number | undefined;
    distance: number | undefined;
    sort: string;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState("breed:asc");
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsData = await apiClient("/dogs/breeds");
        setBreeds(breedsData);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  const handleBreedChange = (selected: any) => {
    setSelectedBreeds(
      selected ? selected.map((option: any) => option.value) : []
    );
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d{0,5}$/.test(value)) {
      setZipCode(value);
    }
  };

  const handleDistanceChange = (selected: any) => {
    setDistance(selected ? selected.value : undefined);
  };

  const handleSortChange = (selected: any) => {
    setSort(selected ? selected.value : "breed:asc");
  };

  const handleAgeMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setAgeMin(isNaN(value) ? undefined : value);
    if (ageMax !== undefined && value > ageMax) {
      setAgeMax(value);
    }
  };

  const handleAgeMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (ageMin !== undefined && value < ageMin) {
      setAgeMax(ageMin);
    } else {
      setAgeMax(isNaN(value) ? undefined : value);
    }
  };

  const handleSearchClick = async () => {
    const filters: {
      breeds: string[];
      zipCode: string;
      distance: number | undefined;
      sort: string;
      ageMin: number | undefined;
      ageMax: number | undefined;
    } = {
      breeds: selectedBreeds,
      zipCode,
      sort,
      ageMin,
      ageMax,
      distance: /^\d{5}$/.test(zipCode) ? distance : undefined,
    };

    onSearch(filters);
  };

  const styles = {
    container: (base) => ({
      ...base,
      flex: 1,
      maxHeight: isFocused ? "20rem" : "3rem",
      width: "50%",

      transition: "max-width 0.2s, min-width 0.2s",
    }),
    control: (base) => ({
      ...base,
      flex: 1,
      width: "100%",
      maxHeight: isFocused ? "20rem" : "3rem",
    }),
    valueContainer: (base) => ({
      ...base,
      flex: 1,
      width: "100%",

      maxHeight: isFocused ? "20rem" : "1.9rem",
    }),
  };

  const breedOptions = breeds.map((breed) => ({ value: breed, label: breed }));
  const distanceOptions = [
    { value: 5, label: "5mi" },
    { value: 10, label: "10mi" },
    { value: 20, label: "20mi" },
    { value: 50, label: "50mi" },
    { value: 100, label: "100mi" },
  ];
  const sortOptions = [
    { value: "breed:asc", label: "Sort by Breed (A-Z)" },
    { value: "breed:desc", label: "Sort by Breed (Z-A)" },
    { value: "age:asc", label: "Sort by Age (Youngest First)" },
    { value: "age:desc", label: "Sort by Age (Oldest First)" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-wrap gap-2 items-center w-full max-w-12xl mx-auto mb-4">
      <div className="min-w-[20rem] flex max-w-sm">
        <Select
          isMulti
          options={breedOptions}
          value={breedOptions.filter((option) =>
            selectedBreeds.includes(option.value)
          )}
          menuPlacement="auto"
          maxMenuHeight={250}
          onChange={handleBreedChange}
          placeholder="Select Breeds"
          className="react-select-container"
          styles={styles}
          onFocus={() => setIsFocused(true)} // Set focused state to true
          onBlur={() => setIsFocused(false)} // Set focused state to false
        />
      </div>
      <div className="flex-shrink-0 w-full sm:w-1/9">
        <input
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Enter ZIP Code"
          pattern="^\d{5}$"
          maxLength={5}
          className="p-2 border border-gray-300 rounded-md w-full input-focus-blue"
        />
      </div>
      <div className="flex-shrink-0 w-full sm:w-1/10">
        <Select
          options={distanceOptions}
          value={distanceOptions.find((option) => option.value === distance)}
          isDisabled={!/^\d{5}$/.test(zipCode)}
          onChange={handleDistanceChange}
          placeholder="Distance"
          className="react-select-container"
        />
      </div>
      <div className="flex-shrink-0 w-1/10 sm:w-1/14">
        <input
          type="number"
          value={ageMin || ""}
          onChange={handleAgeMinChange}
          placeholder="Min Age"
          className="p-2 border border-gray-300 rounded-md w-full input-focus-blue"
          min={0}
          max={20}
        />
      </div>
      <div className="flex-shrink-0 w-1/10 sm:w-1/14">
        <input
          type="number"
          value={ageMax || ""}
          onChange={handleAgeMaxChange}
          placeholder="Max Age"
          className="p-2 border border-gray-300 rounded-md w-full input-focus-blue"
          min={0}
          max={30}
        />
      </div>
      <div className="flex-shrink-0 w-full sm:w-1/5">
        <Select
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sort)}
          onChange={handleSortChange}
          placeholder="Sort"
          className="react-select-container"
        />
      </div>
      <div className="flex-shrink-0 sm:w-auto">
        <button
          onClick={handleSearchClick}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          style={{ flexShrink: 0 }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
