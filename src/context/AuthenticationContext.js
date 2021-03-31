import axios from "axios";
import React, { useState, Children, useEffect } from "react";
import { AsyncStorage } from "react-native";

import { UserModel } from "../models";

export type AuthenticationContextType = {
  isLoggedIn: boolean;
  user?: UserModel;
  login: (user: UserModel) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

export const AuthenticationContext = React.createContext<
  AuthenticationContextType
>({
  isLoggedIn: false,
  user: undefined,
  login: (_: UserModel) => Promise.resolve(false),
  logout: () => Promise.resolve(false),
});

export const AuthenticationProvider: React.FC<{ user?: UserModel }> = (
  props
) => {
  const [user, setUser] = useState<UserModel>();

  const login = async (user: UserModel) => {
    axios.defaults.headers["Authorization"] =
      "Bearer " + (await AsyncStorage.getItem("AccessToken"));
    setUser(user);
    return Promise.resolve(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["AccessToken", "User"]);
    axios.defaults.headers["Authorization"] = null;
    setUser(undefined);
    return Promise.resolve(true);
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <AuthenticationContext.Provider
      value={{ login, logout, user: user, isLoggedIn: !!user }}
    >
      {Children.only(props.children)}
    </AuthenticationContext.Provider>
  );
};
