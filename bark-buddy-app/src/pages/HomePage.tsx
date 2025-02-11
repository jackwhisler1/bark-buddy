import { useState } from "react";
import DogList from "../components/DogList";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewFavorites, setViewFavorites] = useState<boolean>(false);
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar
        viewFavorites={viewFavorites}
        setViewFavorites={setViewFavorites}
        favorites={favorites}
      />
      <div className="flex-grow flex flex-col items-center justify-center p-6 mt-15">
        <button
          onClick={handleMatch}
          disabled={favorites.length === 0}
          className="bg-[#2a3b50] text-white px-4 py-2 rounded-md hover:bg-[#1b2538] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Match My Bark Buddy
        </button>
        <DogList
          onFavorite={handleFavorite}
          favorites={favorites}
          viewFavorites={viewFavorites}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
