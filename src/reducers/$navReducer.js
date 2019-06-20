import { Animated } from "react-native";
const initState = {
  filtersVisible: false,
  detailsVisible: false,
  spinmangaMalCarousel: new Animated.Value(-100),
  rollMangaAndFilters: true,
  resetAndDetails: false,
  displayMangaMalPointer: new Animated.Value(0),
  displayMangaMalInfo: new Animated.Value(0),
  displayMangaTitle: false,
  displayUsernameForm: true,
  defaultUser: "",
  drawerColor: "#FF4081"
};
const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "$HIDE_ROLL_AND_FILTERS":
      return {
        ...state,
        rollMangaAndFilters: false
      };
    case "$SHOW_ROLL_AND_FILTERS":
      return {
        ...state,
        rollMangaAndFilters: true
      };
    case "$HIDE_RESET_AND_DETAILS":
      return {
        ...state,
        resetAndDetails: false
      };
    case "$SHOW_RESET_AND_DETAILS":
      return {
        ...state,
        resetAndDetails: true
      };

    case "$OPEN_MANGA_MAL_FILTERS":
      return {
        ...state,
        filtersVisible: true
      };
    case "$CLOSE_MANGA_MAL_FILTERS":
      return {
        ...state,
        filtersVisible: false
      };
    case "$OPEN_MANGA_DETAILS":
      return {
        ...state,
        detailsVisible: true
      };
    case "$CLOSE_MANGA_DETAILS":
      return {
        ...state,
        detailsVisible: false
      };
    case "$HIDE_USERNAME_FORM":
      return {
        ...state,
        displayUsernameForm: false
      };
    case "$SHOW_USERNAME_FORM":
      return {
        ...state,
        displayUsernameForm: true
      };
    case "$SHOW_MANGA_TITLE":
      return {
        ...state,
        displayMangaTitle: true
      };
    case "$HIDE_MANGA_TITLE":
      return {
        ...state,
        displayMangaTitle: false
      };

    default:
      return state;
  }
};

export default navReducer;
