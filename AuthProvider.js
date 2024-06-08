import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const uid = await SecureStore.getItemAsync("userUID");
      if (uid) {
        setCurrentUser({ uid }); // Simplified example, ideally you fetch user details
      }
    };

    checkUserLoggedIn();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("userUID");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
