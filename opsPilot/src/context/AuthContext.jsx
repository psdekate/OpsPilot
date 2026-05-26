import { createContext, useContext, useState } from "react";
import { ROLES } from "../constants/permissions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Piyush", role: ROLES.ADMIN });

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
