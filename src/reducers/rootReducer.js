import { combineReducers } from "redux";
import navReducer from "./navReducer";
import animeMalReducer from "./animeMalReducer";
import animeCustomReducer from "./animeCustomReducer";
import mangaMalReducer from "./mangaMalReducer";
import mangaCustomReducer from "./mangaCustomReducer";
import $navReducer from "./$navReducer";

const rootReducer = combineReducers({
  navReducer: navReducer,
  animeMalReducer: animeMalReducer,
  animeCustomReducer: animeCustomReducer,
  mangaMalReducer: mangaMalReducer,
  mangaCustomReducer: mangaCustomReducer,
  $navReducer: $navReducer
});

export default rootReducer;
