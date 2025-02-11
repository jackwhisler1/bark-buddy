import { Link } from "react-router-dom";
import logo from "../assets/bark_buddy_logo.png";

interface NavbarProps {
  viewFavorites?: boolean;
  setViewFavorites?: (viewFavorites: boolean) => void;
  favorites?: string[];
  showFavoritesButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  viewFavorites,
  setViewFavorites,
  favorites,
  showFavoritesButton = true,
}) => {
  return (
    <>
      <header className="bg-[#1b2538] shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={logo}
                alt="Bark Buddy Logo"
                className="h-auto w-auto max-h-16 max-w-full"
              />
            </Link>
            <p className="text-lg italic text-white chewy-regular">
              Find Your New Best Friend
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-grow flex justify-end">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-white hover:underline">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {showFavoritesButton && favorites && favorites.length > 0 && (
        <div className="fixed bottom-25 right-15 z-50">
          <button
            onClick={() => setViewFavorites && setViewFavorites(!viewFavorites)}
            className="bg-white text-[#1b2538] bold py-2 px-4 rounded-md shadow-lg hover:bg-gray-200"
          >
            {viewFavorites ? "View All Dogs" : "View Favorites"}
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
