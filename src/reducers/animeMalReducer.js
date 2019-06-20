const initState = {
  userAnime: undefined,
  animeInfo: undefined,
  displayOption: {
    success: false,
    loading: false,
    error: false
  },
  animeDescState: {
    success: false,
    loading: false,
    error: false
  },
  random50anime: [],
  currentAnime: null,
  filters: {
    listTypeF: 6,
    airing_statusF: [1, 2], //1=currently 2=aired 3=not yet
    episodesF: { from: 0, to: 0 }
  },
  showEnterUsername: false
};

const filterRandomAnime = (allAnime, listTypeF, airing_statusF, episodesF) => {
  const minEpisodes = episodesF.from; //0
  const maxEpisodes = episodesF.to; // 1

  const airingFilter = allAnime.filter(
    anime => !airing_statusF.includes(anime.airing_status)
  );
  airingFilter.length === allAnime.length && (airingFilter.length = 0);

  const episodeFilter = allAnime.filter(anime => {
    let episodes = anime.total_episodes;
    if (maxEpisodes === 0 && minEpisodes === 0) {
      return false;
    } else if (maxEpisodes === 0 && minEpisodes !== 0) {
      return episodes < minEpisodes;
    } else if (maxEpisodes !== 0 && minEpisodes === 0) {
      return episodes > maxEpisodes;
    } else {
      return episodes < minEpisodes || episodes > maxEpisodes;
    }
  });

  const listTypeFilter = allAnime.filter(
    each => each.watching_status === listTypeF
  );

  const animeToFilter = [...new Set([].concat(airingFilter, episodeFilter))];
  const filteredAnime = listTypeFilter.filter(
    anime => !animeToFilter.includes(anime)
  );

  const myRandomAnime = anime => {
    let arr = [...anime];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
      .map((each, index) => {
        if (index < 50) {
          return each;
        }
      })
      .filter(x => x);
  };
  return myRandomAnime(filteredAnime);
};

const animeMalReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_MAL_DATA":
      return {
        ...state,
        displayOption: {
          success: false,
          loading: true,
          error: false
        }
      };
    case "MAL_DATA_REQUEST_SUCCESSFUL":
      if (action.type === "MAL_DATA_REQUEST_SUCCESSFUL") {
        return {
          ...state,
          userAnime: action.payload,
          displayOption: {
            success: true,
            loading: false,
            error: false
          },
          random50anime: filterRandomAnime(
            action.payload,
            state.filters.listTypeF,
            state.filters.airing_statusF,
            state.filters.episodesF
          ),
          showEnterUsername: false
        };
      }
    case "MAL_DATA_REQUEST_FAILED":
      return {
        ...state,
        displayOption: {
          success: false,
          loading: false,
          error: true
        }
      };
    case "LOADING_ANIME_INFO":
      return {
        ...state,
        animeDescState: {
          success: false,
          loading: true,
          error: false
        },
        currentAnime: action.animeID
      };
    case "ANIME_INFO_LOADED":
      return {
        ...state,
        animeInfo: action.payload,
        animeDescState: {
          success: true,
          loading: false,
          error: false
        }
      };
    case "ANIME_INFO_FAILED_TO_LOAD":
      return {
        ...state,
        animeDescState: {
          success: false,
          loading: false,
          error: true
        }
      };
    case "CHANGE_LIST_TYPE":
      return {
        ...state,
        filters: { ...state.filters, listTypeF: action.payload },
        random50anime: filterRandomAnime(
          state.userAnime,
          action.payload,
          state.filters.airing_statusF,
          state.filters.episodesF
        )
      };
    case "TOGGLE_AIRING_STATUS":
      if (state.filters.airing_statusF.includes(action.status)) {
        const withoutCurr = state.filters.airing_statusF.filter(
          s => s !== action.status
        );
        return {
          ...state,
          filters: { ...state.filters, airing_statusF: withoutCurr },
          random50anime: filterRandomAnime(
            state.userAnime,
            state.filters.listTypeF,
            withoutCurr,
            state.filters.episodesF
          )
        };
      } else {
        return {
          ...state,
          filters: {
            ...state.filters,
            airing_statusF: [...state.filters.airing_statusF, action.status]
          },
          random50anime: filterRandomAnime(
            state.userAnime,
            state.filters.listTypeF,
            [...state.filters.airing_statusF, action.status],
            state.filters.episodesF
          )
        };
      }
    case "UPDATE_MIN_EPISODES":
      return {
        ...state,
        filters: {
          ...state.filters,
          episodesF: {
            ...state.filters.episodesF,
            from: action.episodes
          }
        },
        random50anime: filterRandomAnime(
          state.userAnime,
          state.filters.listTypeF,
          state.filters.airing_statusF,
          {
            ...state.filters.episodesF,
            from: action.episodes
          }
        )
      };
    case "UPDATE_MAX_EPISODES":
      return {
        ...state,
        filters: {
          ...state.filters,
          episodesF: {
            ...state.filters.episodesF,
            to: action.episodes
          }
        },
        random50anime: filterRandomAnime(
          state.userAnime,
          state.filters.listTypeF,
          state.filters.airing_statusF,
          {
            ...state.filters.episodesF,
            to: action.episodes
          }
        )
      };
    case "REFRESH_MAL_ANIME_CAROUSEL":
      return {
        ...state,
        random50anime: filterRandomAnime(
          state.userAnime,
          state.filters.listTypeF,
          state.filters.airing_statusF,
          state.filters.episodesF
        )
      };
    case "SHOW_ENTER_USERNAME":
      return {
        ...state,
        showEnterUsername: true
      };
    default:
      return state;
  }
};

export default animeMalReducer;
