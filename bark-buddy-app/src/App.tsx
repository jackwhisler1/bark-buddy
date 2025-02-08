import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import MatchPage from "./pages/MatchPage";

const App: React.FC = () => {
  const handleLogin = () => {
    console.log("User logged in!");
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/match" element={<MatchPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
