import React, { useState, useEffect, useContext } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import decode from "jwt-decode";
import { useRouter } from "next/router";
import { AuthLogin, AuthRegister } from "../services";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { replace, pathname } = useRouter();

  const register = async ({ username, password }) => {
    const res = await AuthRegister({ username, password });
    if (res.status === 200) {
      await login({ username, password });
    } else {
      alert(`Message : ${res.response.data.msg}`);
    }
  };

  const login = async ({ username, password }) => {
    const res = await AuthLogin({ username, password });
    if (res.status === 200) {
      getUserInfo();
      replace("dashboard");
    } else {
      alert(`Message : ${res.response.data.msg}`);
    }
  };

  const logout = () => {
    deleteCookie("token");
    setCurrentUser(null);
    replace("/login");
  };

  const getUserInfo = () => {
    const token = getCookie("token");
    if (token) {
      const { user } = decode(token);
      setCurrentUser(user);
    } else {
      pathname !== "/register" && replace("/login");
    }
  };
  useEffect(() => {
    getUserInfo();
    setLoading(false);
    return getUserInfo;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
