import React from "react";
import Login from "../components/Auth/Login";
import Footer from "../components/Footer";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex items-center justify-center p-6">
        <Login onLogin={onLogin} />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
