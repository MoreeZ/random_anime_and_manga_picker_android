import { Animated } from "react-native";
const initState = {
  loadingStatus: {
    loading: false,
    success: false,
    error: false
  },
  localAnimeLists: [],
  currentAnimeList: {},
  top50localAnime: [],
  winner: "",
  spinCustomAnime: new Animated.Value(0),
  displayAnimePointer: new Animated.Value(0),
  displayWinner: false,
  displayAddAnime: true,
  rollAnimeAndAnimeList: true,
  resetBtn: false,
  openAnimeList: false,
  updateList: true
};
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const myRandomAnime = anime => {
  return shuffle([...anime])
    .map((each, index) => {
      if (index < 50) {
        return each;
      }
    })
    .filter(x => x);
};
const animeMalReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_LOCAL_ANIME":
      return {
        ...state,
        loadingStatus: {
          success: false,
          error: false,
          loading: true
        }
      };
    case "LOCAL_ANIME_SUCCESS":
      return {
        ...state,
        loadingStatus: {
          loading: false,
          error: false,
          success: true
        },
        localAnimeLists: action.localAnimeLists,
        currentAnimeList: action.currentAnimeList,
        top50localAnime: myRandomAnime([...action.currentAnimeList.list])
      };
    case "LOCAL_ANIME_FAIL":
      return {
        ...state,
        loadingStatus: {
          loading: false,
          success: false,
          error: true
        }
      };
    case "REFRESH_LOCAL_ANIME_CAROUSEL":
      return {
        ...state,
        top50localAnime: myRandomAnime([...state.currentAnimeList.list])
      };

    case "ADD_ANIME_TO_LOCAL_LIST":
      return {
        ...state,
        localAnimeLists: action.localAnimeLists,
        currentAnimeList: action.currentAnimeList,
        top50localAnime: myRandomAnime([...action.currentAnimeList.list])
      };
    case "MAL_LIST_IMPORTED":
      return {
        ...state,
        loadingStatus: {
          loading: false,
          error: false,
          success: true
        },
        localAnimeLists: action.localAnimeLists,
        currentAnimeList: action.currentAnimeList,
        top50localAnime: myRandomAnime([...action.currentAnimeList.list]),
        openAnimeList: false
      };
    case "ANIME_IMPORT_ERROR":
      return {
        loadingStatus: {
          loading: false,
          error: true,
          success: false
        }
      };
    case "CHANGE_ANIME_LIST":
      return {
        ...state,
        currentAnimeList: action.currentAnimeList,
        top50localAnime: myRandomAnime([...action.currentAnimeList.list])
      };
    case "CREATE_ANIME_LIST":
      return {
        ...state,
        localAnimeLists: action.localAnimeLists,
        currentAnimeList: action.currentAnimeList,
        top50localAnime: myRandomAnime([...action.currentAnimeList.list])
      };
    case "REMOVE_ANIME_LIST":
      return {
        ...state,
        localAnimeLists: action.localAnimeLists
      };
    case "LOCK_ANIMELIST":
      return { ...state, updateList: false };
    case "UPDATE_ANIMELIST":
      return {
        ...state,
        updateList: true
      };
    case "LOG_WINNER":
      return {
        ...state,
        winner: action.winner
      };
    case "HIDE_ROLL_AND_ANIME_LIST":
      return {
        ...state,
        rollAnimeAndAnimeList: false
      };
    case "HIDE_ADD_ANIME":
      return {
        ...state,
        displayAddAnime: false
      };
    case "SHOW_RESET":
      return {
        ...state,
        resetBtn: true
      };
    case "SHOW_WINNER":
      return {
        ...state,
        displayWinner: true
      };
    case "SHOW_ROLL_AND_ANIME_LIST":
      return {
        ...state,
        rollAnimeAndAnimeList: true
      };
    case "SHOW_ADD_ANIME":
      return {
        ...state,
        displayAddAnime: true
      };
    case "HIDE_RESET":
      return {
        ...state,
        resetBtn: false
      };
    case "HIDE_WINNER":
      return {
        ...state,
        displayWinner: false
      };
    case "OPEN_ANIMELIST":
      return {
        ...state,
        openAnimeList: true
      };
    case "CLOSE_ANIMELIST":
      return {
        ...state,
        openAnimeList: false
      };
    default:
      return state;
  }
};

export default animeMalReducer;
