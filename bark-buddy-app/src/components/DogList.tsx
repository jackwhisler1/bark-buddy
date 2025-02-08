import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dog } from "../types";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "./SearchBar";
import apiClient from "../utils/apiClient";

interface DogListProps {
  onFavorite: (id: string) => void;
  favorites: string[];
}

const DogList: React.FC<DogListProps> = ({ onFavorite, favorites }) => {
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
  const [viewFavorites, setViewFavorites] = useState(false);
  const [allFavoriteDogs, setAllFavoriteDogs] = useState<Dog[]>([]);

  const fetchDogs = async (query?: string) => {
    setLoading(true);
    try {
      let searchParams = new URLSearchParams();

      if (!query) {
        if (filters.breeds.length > 0) {
          searchParams.append("breeds", filters.breeds.join(","));
        }
        searchParams.append("sort", "breed:asc");
        searchParams.append("size", "24");
      } else {
        searchParams = new URLSearchParams(query);
      }

      const finalQueryString = searchParams.toString();

      const searchResults = await apiClient(`/dogs/search?${finalQueryString}`);

      const dogDetails = await apiClient("/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchResults.resultIds),
      });

      setDogs(dogDetails);
      setPagination({
        next: searchResults.next?.replace("/dogs/search?", ""),
        prev: searchResults.prev?.replace("/dogs/search?", ""),
      });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogs();
  }, [filters]);

  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      try {
        const favoriteDogDetails = await apiClient("/dogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favorites),
        });
        setAllFavoriteDogs(favoriteDogDetails);
      } catch (error) {
        console.error("Error fetching favorite dogs:", error);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteDogs();
    } else {
      setAllFavoriteDogs([]);
    }
  }, [favorites]);

  const handleFavorite = (dog: Dog) => {
    onFavorite(dog.id);
  };

  const displayedDogs = viewFavorites ? allFavoriteDogs : dogs;

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-4">
          <SearchBar onSearch={(filters) => setFilters(filters)} />
          {favorites.length > 0 && (
            <button
              onClick={() => setViewFavorites(!viewFavorites)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {viewFavorites ? "View All Dogs" : "View Favorites"}
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedDogs.map((dog) => (
            <div
              key={dog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
              style={{ height: "25rem" }}
            >
              <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-48 object-contain mt-2"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{dog.name}</h2>
                <p className="text-gray-600">{dog.breed}</p>
                <p className="text-gray-500 text-sm">
                  {dog.age === 0
                    ? "Puppy"
                    : dog.age === 1
                    ? "1 year old"
                    : `${dog.age} years old`}
                </p>
                <p className="text-gray-500 text-sm">
                  Zip Code: {dog.zip_code}
                </p>
              </div>
              <button
                onClick={() => handleFavorite(dog)}
                className="mt-2 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={favorites.includes(dog.id) ? solidHeart : regularHeart}
                  className={`text-xl ${
                    favorites.includes(dog.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
                <span className="ml-2">
                  {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
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

export default DogList;
