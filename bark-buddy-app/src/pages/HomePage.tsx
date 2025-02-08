import { useState } from "react";
import DogList from "../components/DogList";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

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

      navigate("/match", { state: { matchedDog: matchedDogDetails[0] } });
    } catch (error) {
      console.error("Error generating match:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mt-6">
        <button
          onClick={handleMatch}
          disabled={favorites.length === 0}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Find My Bark Buddy
        </button>
      </div>
      <DogList onFavorite={handleFavorite} favorites={favorites} />
    </div>
  );
};

export default HomePage;
