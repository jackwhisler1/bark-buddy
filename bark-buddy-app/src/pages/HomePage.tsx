// pages/HomePage.tsx
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import DogList from "../components/DogList";

const HomePage = () => {
  const [filters, setFilters] = useState({ breed: "", sort: "breed:asc" });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SearchBar onSearch={setFilters} />
      <DogList filters={filters} />
    </div>
  );
};

export default HomePage;
