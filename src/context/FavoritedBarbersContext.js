import React, { useState, Children, useContext, useEffect } from "react";

import { AuthenticationContext } from "./AuthenticationContext";
import { NewsService } from "../services";
import { Alert } from "react-native";



export const FavoritedNewsContext = React.createContext<
  FavoritedNewsContextType
>({
  favoritedNews: {},
  favoriteNews: () => {},
});

export const FavoritedNewsProvider = (props) => {
  const [favoritedNews, setFavoritedNews] = useState<any>({});
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      NewsService.getFavoritedNews()
        .then((res) => {
          var newsList = {};
          (res.data as NewsModel[]).forEach((item) => {
            newsList[item.id] = item;
          });
          setFavoritedNews(newsList);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            authContext.logout();
          } else {
            Alert.alert(err.message);
          }
        });
    } else {
      setFavoritedNews({});
    }
  }, [authContext.isLoggedIn]);

  const favoriteNews = (news: NewsModel, isFavorite: boolean) => {
    if (isFavorite) {
      favoritedNews[news.id] = news;
    } else {
      delete favoritedNews[news.id];
    }
    setFavoritedNews({ ...favoritedNews });
  };

  return (
    <FavoritedNewsContext.Provider value={{ favoritedNews, favoriteNews }}>
      {Children.only(props.children)}
    </FavoritedNewsContext.Provider>
  );
};
