import { Animated } from "react-native";
const initState = {
  loadingStatus: {
    loading: false,
    success: false,
    error: false
  },
  localMangaLists: [],
  currentMangaList: {},
  top50localManga: [],
  winner: "",
  spinCustomManga: new Animated.Value(0),
  displayMangaPointer: new Animated.Value(0),
  displayWinner: false,
  displayAddManga: true,
  rollMangaAndMangaList: true,
  resetBtn: false,
  openMangaList: false,
  updateList: true
};
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const myRandomManga = manga => {
  return shuffle([...manga])
    .map((each, index) => {
      if (index < 50) {
        return each;
      }
    })
    .filter(x => x);
};
const mangaMalReducer = (state = initState, action) => {
  switch (action.type) {
    case "$LOADING_LOCAL_MANGA":
      return {
        ...state,
        loadingStatus: {
          success: false,
          error: false,
          loading: true
        }
      };
    case "$LOCAL_MANGA_SUCCESS":
      return {
        ...state,
        loadingStatus: {
          loading: false,
          error: false,
          success: true
        },
        localMangaLists: action.localMangaLists,
        currentMangaList: action.currentMangaList,
        top50localManga: myRandomManga([...action.currentMangaList.list])
      };
    case "$LOCAL_MANGA_FAIL":
      return {
        ...state,
        loadingStatus: {
          loading: false,
          success: false,
          error: true
        }
      };
    case "$REFRESH_LOCAL_MANGA_CAROUSEL":
      return {
        ...state,
        top50localManga: myRandomManga([...state.currentMangaList.list])
      };

    case "$ADD_MANGA_TO_LOCAL_LIST":
      return {
        ...state,
        localMangaLists: action.localMangaLists,
        currentMangaList: action.currentMangaList,
        top50localManga: myRandomManga([...action.currentMangaList.list])
      };
    case "$MAL_LIST_IMPORTED":
      return {
        ...state,
        loadingStatus: {
          loading: false,
          error: false,
          success: true
        },
        localMangaLists: action.localMangaLists,
        currentMangaList: action.currentMangaList,
        top50localManga: myRandomManga([...action.currentMangaList.list]),
        openMangaList: false
      };
    case "$MANGA_IMPORT_ERROR":
      return {
        loadingStatus: {
          loading: false,
          error: true,
          success: false
        }
      };
    case "$CHANGE_MANGA_LIST":
      return {
        ...state,
        currentMangaList: action.currentMangaList,
        top50localManga: myRandomManga([...action.currentMangaList.list])
      };
    case "$CREATE_MANGA_LIST":
      return {
        ...state,
        localMangaLists: action.localMangaLists,
        currentMangaList: action.currentMangaList,
        top50localManga: myRandomManga([...action.currentMangaList.list])
      };
    case "$REMOVE_MANGA_LIST":
      return {
        ...state,
        localMangaLists: action.localMangaLists
      };
    case "$LOCK_MANGALIST":
      return { ...state, updateList: false };
    case "$UPDATE_MANGALIST":
      return {
        ...state,
        updateList: true
      };
    case "$LOG_WINNER":
      return {
        ...state,
        winner: action.winner
      };
    case "$HIDE_ROLL_AND_MANGA_LIST":
      return {
        ...state,
        rollMangaAndMangaList: false
      };
    case "$HIDE_ADD_MANGA":
      return {
        ...state,
        displayAddManga: false
      };
    case "$SHOW_RESET":
      return {
        ...state,
        resetBtn: true
      };
    case "$SHOW_WINNER":
      return {
        ...state,
        displayWinner: true
      };
    case "$SHOW_ROLL_AND_MANGA_LIST":
      return {
        ...state,
        rollMangaAndMangaList: true
      };
    case "$SHOW_ADD_MANGA":
      return {
        ...state,
        displayAddManga: true
      };
    case "$HIDE_RESET":
      return {
        ...state,
        resetBtn: false
      };
    case "$HIDE_WINNER":
      return {
        ...state,
        displayWinner: false
      };
    case "$OPEN_MANGALIST":
      return {
        ...state,
        openMangaList: true
      };
    case "$CLOSE_MANGALIST":
      return {
        ...state,
        openMangaList: false
      };
    default:
      return state;
  }
};

export default mangaMalReducer;
