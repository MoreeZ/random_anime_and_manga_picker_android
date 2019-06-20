import { Animated } from "react-native";
const initState = {
  filtersVisible: false,
  detailsVisible: false,
  spinanimeMalCarousel: new Animated.Value(-100),
  rollAnimeAndFilters: true,
  resetAndDetails: false,
  displayAnimeMalPointer: new Animated.Value(0),
  displayAnimeMalInfo: new Animated.Value(0),
  displayAnimeTitle: false,
  displayUsernameForm: true,
  defaultUser: "",
  drawerColor: "#009EE1"
};
const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_DRAWER_COLOR":
      return {
        ...state,
        drawerColor: action.color
      };
    case "HIDE_ROLL_AND_FILTERS":
      return {
        ...state,
        rollAnimeAndFilters: false
      };
    case "SHOW_ROLL_AND_FILTERS":
      return {
        ...state,
        rollAnimeAndFilters: true
      };
    case "HIDE_RESET_AND_DETAILS":
      return {
        ...state,
        resetAndDetails: false
      };
    case "SHOW_RESET_AND_DETAILS":
      return {
        ...state,
        resetAndDetails: true
      };

    case "OPEN_ANIME_MAL_FILTERS":
      return {
        ...state,
        filtersVisible: true
      };
    case "CLOSE_ANIME_MAL_FILTERS":
      return {
        ...state,
        filtersVisible: false
      };
    case "OPEN_ANIME_DETAILS":
      return {
        ...state,
        detailsVisible: true
      };
    case "CLOSE_ANIME_DETAILS":
      return {
        ...state,
        detailsVisible: false
      };
    case "HIDE_USERNAME_FORM":
      return {
        ...state,
        displayUsernameForm: false
      };
    case "SHOW_USERNAME_FORM":
      return {
        ...state,
        displayUsernameForm: true
      };
    case "SHOW_ANIME_TITLE":
      return {
        ...state,
        displayAnimeTitle: true
      };
    case "HIDE_ANIME_TITLE":
      return {
        ...state,
        displayAnimeTitle: false
      };

    default:
      return state;
  }
};

export default navReducer;
