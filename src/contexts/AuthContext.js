import React, { useState, useEffect, useContext, useRef } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import decode from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { replace, pathname } = useRouter();

  // const Register = () => {
  //   return;
  // };

  // const Login = ({ username, password }) => {
  //   return;
  // };

  const logout = () => {
    deleteCookie("token");
    setCurrentUser(null);
    replace("/login");
  };

  useEffect(() => {
    const getUserInfo = () => {
      const token = getCookie("token");
      if (token) {
        const { user } = decode(token);
        setCurrentUser(user);
      } else {
        pathname !== "/register" && replace("/login");
      }
      setLoading(false);
    };
    return getUserInfo;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
