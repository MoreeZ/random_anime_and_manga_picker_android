const initState = {
  userManga: undefined,
  mangaInfo: undefined,
  displayOption: {
    success: false,
    loading: false,
    error: false
  },
  mangaDescState: {
    success: false,
    loading: false,
    error: false
  },
  random50manga: [],
  currentManga: null,
  filters: {
    listTypeF: 6,
    publishing_statusF: [1, 2], //1=currently 2=aired 3=not yet
    chaptersF: { from: 0, to: 0 }
  },
  showEnterUsername: false
};

const filterRandomManga = (
  allManga,
  listTypeF,
  publishing_statusF,
  chaptersF
) => {
  const minEpisodes = chaptersF.from; //0
  const maxEpisodes = chaptersF.to; // 1

  const publishingFilter = allManga.filter(
    manga => !publishing_statusF.includes(manga.publishing_status)
  );
  publishingFilter.length === allManga.length && (publishingFilter.length = 0);

  const chapterFilter = allManga.filter(manga => {
    let chapters = manga.total_chapters;
    if (maxEpisodes === 0 && minEpisodes === 0) {
      return false;
    } else if (maxEpisodes === 0 && minEpisodes !== 0) {
      return chapters < minEpisodes;
    } else if (maxEpisodes !== 0 && minEpisodes === 0) {
      return chapters > maxEpisodes;
    } else {
      return chapters < minEpisodes || chapters > maxEpisodes;
    }
  });

  const listTypeFilter = allManga.filter(
    each => each.reading_status === listTypeF
  );

  const mangaToFilter = [
    ...new Set([].concat(publishingFilter, chapterFilter))
  ];
  const filteredManga = listTypeFilter.filter(
    manga => !mangaToFilter.includes(manga)
  );

  const myRandomManga = manga => {
    let arr = [...manga];
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
  return myRandomManga(filteredManga);
};

const mangaMalReducer = (state = initState, action) => {
  switch (action.type) {
    case "$LOADING_MAL_DATA":
      return {
        ...state,
        displayOption: {
          success: false,
          loading: true,
          error: false
        }
      };
    case "$MAL_DATA_REQUEST_SUCCESSFUL":
      return {
        ...state,
        userManga: action.payload,
        displayOption: {
          success: true,
          loading: false,
          error: false
        },
        random50manga: filterRandomManga(
          action.payload,
          state.filters.listTypeF,
          state.filters.publishing_statusF,
          state.filters.chaptersF
        ),
        showEnterUsername: false
      };
    case "$MAL_DATA_REQUEST_FAILED":
      return {
        ...state,
        displayOption: {
          success: false,
          loading: false,
          error: true
        }
      };
    case "$LOADING_MANGA_INFO":
      return {
        ...state,
        mangaDescState: {
          success: false,
          loading: true,
          error: false
        },
        currentManga: action.mangaID
      };
    case "$MANGA_INFO_LOADED":
      return {
        ...state,
        mangaInfo: action.payload,
        mangaDescState: {
          success: true,
          loading: false,
          error: false
        }
      };
    case "$MANGA_INFO_FAILED_TO_LOAD":
      return {
        ...state,
        mangaDescState: {
          success: false,
          loading: false,
          error: true
        }
      };
    case "$CHANGE_LIST_TYPE":
      return {
        ...state,
        filters: { ...state.filters, listTypeF: action.payload },
        random50manga: filterRandomManga(
          state.userManga,
          action.payload,
          state.filters.publishing_statusF,
          state.filters.chaptersF
        )
      };
    case "$TOGGLE_AIRING_STATUS":
      if (state.filters.publishing_statusF.includes(action.status)) {
        const withoutCurr = state.filters.publishing_statusF.filter(
          s => s !== action.status
        );
        return {
          ...state,
          filters: { ...state.filters, publishing_statusF: withoutCurr },
          random50manga: filterRandomManga(
            state.userManga,
            state.filters.listTypeF,
            withoutCurr,
            state.filters.chaptersF
          )
        };
      } else {
        return {
          ...state,
          filters: {
            ...state.filters,
            publishing_statusF: [
              ...state.filters.publishing_statusF,
              action.status
            ]
          },
          random50manga: filterRandomManga(
            state.userManga,
            state.filters.listTypeF,
            [...state.filters.publishing_statusF, action.status],
            state.filters.chaptersF
          )
        };
      }
    case "$UPDATE_MIN_EPISODES":
      return {
        ...state,
        filters: {
          ...state.filters,
          chaptersF: {
            ...state.filters.chaptersF,
            from: action.chapters
          }
        },
        random50manga: filterRandomManga(
          state.userManga,
          state.filters.listTypeF,
          state.filters.publishing_statusF,
          {
            ...state.filters.chaptersF,
            from: action.chapters
          }
        )
      };
    case "$UPDATE_MAX_EPISODES":
      return {
        ...state,
        filters: {
          ...state.filters,
          chaptersF: {
            ...state.filters.chaptersF,
            to: action.chapters
          }
        },
        random50manga: filterRandomManga(
          state.userManga,
          state.filters.listTypeF,
          state.filters.publishing_statusF,
          {
            ...state.filters.chaptersF,
            to: action.chapters
          }
        )
      };
    case "$REFRESH_MAL_MANGA_CAROUSEL":
      return {
        ...state,
        random50manga: filterRandomManga(
          state.userManga,
          state.filters.listTypeF,
          state.filters.publishing_statusF,
          state.filters.chaptersF
        )
      };
    case "$SHOW_ENTER_USERNAME":
      return {
        ...state,
        showEnterUsername: true
      };
    default:
      return state;
  }
};

export default mangaMalReducer;
