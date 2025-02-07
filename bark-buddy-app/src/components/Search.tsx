import React, { useState, useEffect } from "react";
import { Dog } from "../types"; // Assuming this is where Dog and Location types are defined
import { useAuth } from "../context/AuthContext";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const { authToken } = useAuth();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/search",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Send the auth cookie with the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dogs");
      }

      const data = await response.json();
      console.log(data);
      setDogs(data); // Assuming the response contains an array of dogs
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {dogs.map((dog) => (
          <div key={dog.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{dog.name}</h3>
            <p>
              {dog.breed} | {dog.age} years old
            </p>
            <p>{dog.zip_code}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
