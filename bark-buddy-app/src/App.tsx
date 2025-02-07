import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  const handleLogin = () => {
    console.log("User logged in!");
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
