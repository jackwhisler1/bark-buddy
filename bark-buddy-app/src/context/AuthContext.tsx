import React, { createContext, useState, useContext, ReactNode } from "react";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  authToken: string | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (name: string, email: string) => {
    try {
      const response = await apiClient("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response === "OK") {
        setAuthToken("authenticated");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      await apiClient("/auth/logout", {
        method: "POST",
      });
      setAuthToken(null);
      navigate("/login");
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
