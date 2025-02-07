import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextProps {
  authToken: string | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = async (name: string, email: string) => {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);
      setAuthToken(data.token);
    } catch (error) {
      if (responseText === "OK") {
        setAuthToken("authenticated");
      } else {
        throw new Error("Unexpected response format");
      }
    }
  };

  const logout = async () => {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        credentials: "include", // Ensure the cookie is sent with the request
      }
    );

    if (!response.ok) throw new Error("Logout failed");

    setAuthToken(null); // Clear the auth token from the app state
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
