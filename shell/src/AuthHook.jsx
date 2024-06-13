import React, { useState, useCallback, createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";

const AuthContext = createContext({
  user: {},
  authenticate: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  const authenticate = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: uuidV4(),
            name: "Erikson",
          });
        }, 1000);
      });

      setUser(userData);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
