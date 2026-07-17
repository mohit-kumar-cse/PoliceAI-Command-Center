// C:\PoliceAI-Command-Center\client\src\context\AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {

      setUser(
        JSON.parse(storedUser)
      );

    }

    setLoading(false);

  }, [token]);





  const login = async (email, password) => {

    const response = await API.post("/auth/login", {
      email,
      password
    });

    const { token: jwtToken, user } = response.data;

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(jwtToken);
    setUser(user);

    return user;

  };





  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

  };




  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);