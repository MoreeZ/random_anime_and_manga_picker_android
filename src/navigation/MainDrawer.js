import React, { Component } from "react";

import { Dimensions } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";

import Anime from "../components/Anime/Anime";
import Manga from "../components/Manga/Manga";
import SideDrawer from "../components/SideDrawer";

const drawerConfig = {
  drawerWidth: Dimensions.get("window").width,
  contentComponent: props => <SideDrawer {...props} />
};

const DrawerNavigator = createDrawerNavigator(
  {
    "Anime Picker": {
      screen: Anime
    },
    "Manga Picker": {
      screen: Manga
    }
  },
  drawerConfig
);

export default createAppContainer(DrawerNavigator);
