import React from "react";
import Login from "../components/Auth/Login";
import Footer from "../components/Footer";
import logo from "../assets/bark_buddy_logo.png";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <img
          src={logo}
          alt="Bark Buddy Logo"
          className="h-40 w-75 mb-6 rounded"
        />
        <Login onLogin={onLogin} />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
