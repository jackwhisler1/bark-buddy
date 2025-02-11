import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MatchPage = () => {
  const location = useLocation();
  const { matchedDog } = location.state;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showFavoritesButton={false} />
      <div className="flex-grow bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Your Bark Buddy Match
          </h1>
          {matchedDog ? (
            <div>
              <h2 className="text-xl font-semibold text-center">
                {matchedDog.name}
              </h2>
              <img
                src={matchedDog.img}
                alt={matchedDog.name}
                className="w-full object-cover rounded-md mb-4"
              />
              <p className="text-center">Breed: {matchedDog.breed}</p>
              <p className="text-center">Age: {matchedDog.age}</p>
              <p className="text-center">Zip Code: {matchedDog.zip_code}</p>
            </div>
          ) : (
            <p className="text-center">No match found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MatchPage;
