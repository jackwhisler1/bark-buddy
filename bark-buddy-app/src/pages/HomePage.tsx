import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import DogList from "../components/DogList";
import apiClient from "../utils/apiClient";
import { Dog } from "../types";

const HomePage = () => {
  const [filters, setFilters] = useState({
    breeds: [] as string[],
    sort: "breed:asc",
  });
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    next?: string;
    prev?: string;
  }>({});

  const fetchDogs = async (from?: string) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();

      if (filters.breeds.length > 0) {
        filters.breeds.forEach((breed) => searchParams.append("breeds", breed));
      }

      searchParams.append("sort", filters.sort);
      searchParams.append("size", "25");

      if (from) {
        searchParams.append("from", from);
      }

      const searchResults = await apiClient(
        `/dogs/search?${searchParams.toString()}`
      );
      const dogDetails = await apiClient("/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchResults.resultIds),
      });

      setDogs(dogDetails);
      setPagination({ next: searchResults.next, prev: searchResults.prev });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
    setLoading(false);
  };

  // Fetch dogs when filters change or on initial load
  useEffect(() => {
    fetchDogs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SearchBar
        onSearch={(newFilters) => setFilters({ ...filters, ...newFilters })}
      />
      <DogList dogs={dogs} loading={loading} />
      <div className="flex justify-center mt-6 gap-4">
        {pagination.prev && (
          <button
            onClick={() => fetchDogs(pagination.prev)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Previous
          </button>
        )}
        {pagination.next && (
          <button
            onClick={() => fetchDogs(pagination.next)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
