import { useState, useEffect, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dog } from "../types";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "./SearchBar";
import apiClient from "../utils/apiClient";
import { fetchDogs } from "../utils/fetchDogs";

interface DogListProps {
  onFavorite: (id: string) => void;
  favorites: string[];
  viewFavorites: boolean;
}

const DogList: React.FC<DogListProps> = ({
  onFavorite,
  favorites,
  viewFavorites,
}) => {
  const [filters, setFilters] = useState({
    breeds: [] as string[],
    zipCode: "",
    ageMin: undefined as number | undefined,
    ageMax: undefined as number | undefined,
    distance: undefined as number | undefined,
    sort: "breed:asc", // Default sorting
  });

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [allFavoriteDogs, setAllFavoriteDogs] = useState<Dog[]>([]);

  const loadDogs = async (pageNumber: number = 0) => {
    setLoading(true);
    try {
      const { dogs, total } = await fetchDogs(filters, undefined, pageNumber);
      setDogs(dogs);
      setPageNumber(pageNumber);
      setTotalResults(total);
    } catch (error) {
      console.error("Error loading dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDogs(); // Load dogs based on selected filters
  }, [filters]);

  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      if (favorites.length > 0) {
        try {
          const favoriteDogDetails = await apiClient("/dogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorites),
          });
          setAllFavoriteDogs(favoriteDogDetails);
        } catch (error) {
          console.error("Error fetching favorite dogs:", error);
        }
      } else {
        setAllFavoriteDogs([]);
      }
    };

    fetchFavoriteDogs();
  }, [favorites]);

  const handleFavorite = (dog: Dog) => {
    onFavorite(dog.id);
  };

  const displayedDogs = viewFavorites ? allFavoriteDogs : dogs;

  const handleSearch = async (
    newFilters: SetStateAction<{
      breeds: string[];
      zipCode: string;
      ageMin: number | undefined;
      ageMax: number | undefined;
      distance: number | undefined;
      sort: string;
    }>
  ) => {
    setFilters(newFilters);
    setPageNumber(0); // Reset to the first page when new filters are applied
  };

  const handlePageChange = (newPageNumber: number) => {
    loadDogs(newPageNumber);
  };

  // Check conditions to hide the "Next" button
  const shouldHideNextButton =
    (pageNumber + 1) * 24 >= totalResults || viewFavorites;

  return (
    <div className="mt-6">
      {!viewFavorites && (
        <div className="flex justify-center mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedDogs.length > 0 ? (
            displayedDogs.map((dog) => (
              <button
                key={dog.id}
                onClick={() => handleFavorite(dog)}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center hover:bg-gray-200 cursor-pointer"
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
                <FontAwesomeIcon
                  icon={favorites.includes(dog.id) ? solidHeart : regularHeart}
                  className={`text-xl ${
                    favorites.includes(dog.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
              </button>
            ))
          ) : (
            <p>No dogs found.</p>
          )}
        </div>
      )}
      <div className="flex justify-center mt-6 mb-12 gap-4">
        {pageNumber > 0 && !viewFavorites && (
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            className="bg-blue-500 text-white  px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Previous
          </button>
        )}
        {!shouldHideNextButton && (
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            className="bg-blue-500 text-white  px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DogList;
