import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("admin", JSON.stringify(user));
    localStorage.setItem("token", token);
    setAdmin(user);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
