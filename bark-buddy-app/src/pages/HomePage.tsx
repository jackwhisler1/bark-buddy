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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<any>(null);

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

  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };
  const handleMatch = async () => {
    try {
      const match = await apiClient("/dogs/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorites),
      });

      // Fetch details of the matched dog
      const matchedDogDetails = await apiClient("/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([match.match]),
      });

      setMatchedDog(matchedDogDetails[0]);
    } catch (error) {
      console.error("Error generating match:", error);
    }
  };
  // Fetch dogs when filters change or on initial load
  useEffect(() => {
    fetchDogs();
  }, [filters]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SearchBar onSearch={(filters) => setFilters(filters)} />
      <DogList
        dogs={dogs}
        loading={loading}
        onFavorite={handleFavorite}
        favorites={favorites}
      />
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
      <div className="flex justify-center mt-6">
        <button
          onClick={handleMatch}
          disabled={favorites.length === 0}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Find My Bark Buddy
        </button>
      </div>
      {matchedDog && (
        <div className="mt-6 flex justify-center">
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-96">
            <img
              src={matchedDog.img}
              alt={matchedDog.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{matchedDog.name}</h3>
              <p className="text-gray-600">{matchedDog.breed}</p>
              <p className="text-gray-500 text-sm">
                {matchedDog.age} years old
              </p>
              <p className="text-gray-500 text-sm">{matchedDog.zip_code}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
