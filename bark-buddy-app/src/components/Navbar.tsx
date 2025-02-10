import logo from "../assets/bark_buddy_logo.png";

const Navbar = () => {
  return (
    <header className="bg-[#1b2538] shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Bark Buddy Logo"
            className="h-auto w-auto max-h-24 max-w-full"
          />
        </div>

        {/* Tagline */}
        <p className="hidden sm:block text-lg italic text-white chewy-regular">
          Find Your New Best Friend
        </p>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/logout" className="text-white hover:underline">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
