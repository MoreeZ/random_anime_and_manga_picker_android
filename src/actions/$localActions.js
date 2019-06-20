import AsyncStorage from "@react-native-community/async-storage";
const pThrottle = require("p-throttle");
const pRetry = require("p-retry");

export const getLocalMangaData = () => {
  // AsyncStorage.clear();
  return async dispatch => {
    dispatch({ type: "$LOADING_LOCAL_MANGA" });
    try {
      const localManga = await AsyncStorage.getItem("mangalists"); //JSON data
      const parsedlocalManga = JSON.parse(localManga); //array of objects
      const currentListName = await AsyncStorage.getItem(
        "current-manga-list-name"
      ); //string

      const currentList =
        parsedlocalManga !== null &&
        parsedlocalManga.find(list => list.name === currentListName)
          ? parsedlocalManga.find(list => list.name === currentListName)
          : {
              name: currentListName ? currentListName : "Initial List",
              list: []
            };

      if (localManga === null) {
        await AsyncStorage.setItem("current-manga-list-name", "Initial List");
        await AsyncStorage.setItem(
          "mangalists",
          JSON.stringify(
            parsedlocalManga
              ? parsedlocalManga
              : [
                  {
                    name: currentListName ? currentListName : "Initial List",
                    list: []
                  }
                ]
          )
        );
      }
      return dispatch({
        type: "$LOCAL_MANGA_SUCCESS",
        localMangaLists: parsedlocalManga
          ? parsedlocalManga
          : [
              {
                name: currentListName ? currentListName : "Initial List",
                list: []
              }
            ],
        currentMangaList: currentList
      });
    } catch (error) {
      return dispatch({ type: "$LOCAL_MANGA_FAIL", error });
    }
  };
};

export const addLocalManga = manga => {
  return async dispatch => {
    try {
      const mangaLists = await AsyncStorage.getItem("mangalists");
      const parsedMangaLists = JSON.parse(mangaLists);
      const currentMangaListName = await AsyncStorage.getItem(
        "current-manga-list-name"
      ); //string
      const currentMangaList = parsedMangaLists.find(
        list => list.name === currentMangaListName
      );
      const listWithoutCurrent = parsedMangaLists.filter(
        list => list.name !== currentMangaList.name
      );

      await AsyncStorage.setItem(
        "mangalists",
        JSON.stringify([
          ...listWithoutCurrent,
          {
            name: currentMangaListName,
            list: [...currentMangaList.list, manga]
          }
        ])
      ).then(async () => {
        dispatch({
          type: "$ADD_MANGA_TO_LOCAL_LIST",
          localMangaLists: [
            ...listWithoutCurrent,
            {
              name: currentMangaListName,
              list: [...currentMangaList.list, manga]
            }
          ],
          currentMangaList: {
            name: currentMangaListName,
            list: [...currentMangaList.list, manga]
          }
        });
      });
    } catch (e) {
      alert(e);
    }
  };
};

export const removeMangaFromList = manga => {
  return async (dispatch, getState) => {
    try {
      const currList = getState().mangaCustomReducer.currentMangaList;
      const mangaLists = await AsyncStorage.getItem("mangalists");
      const parsedMangaLists = JSON.parse(mangaLists);
      const listWithoutCurrent = parsedMangaLists.filter(
        list => list.name !== currList.name
      );
      const currentListWithoutManga = currList.list.filter(
        each => each !== manga
      );

      await AsyncStorage.setItem(
        "mangalists",
        JSON.stringify([
          ...listWithoutCurrent,
          {
            name: currList.name,
            list: currentListWithoutManga
          }
        ])
      ).then(async () => {
        dispatch({
          type: "$ADD_MANGA_TO_LOCAL_LIST",
          localMangaLists: [
            ...listWithoutCurrent,
            {
              name: currList.name,
              list: currentListWithoutManga
            }
          ],
          currentMangaList: {
            name: currList.name,
            list: currentListWithoutManga
          }
        });
      });
    } catch (e) {
      alert(e);
    }
  };
};

export const importMangaList = (username, listName, listType) => {
  return async dispatch => {
    try {
      dispatch({ type: "$LOADING_LOCAL_MANGA" });
      await fetch(`https://api.jikan.moe/v3/user/${username}`)
        .then(res => res.json())
        .then(res => res.manga_stats[listType])
        .then(entries => {
          const pages = Math.floor(entries / 300) + 1;
          let allManga = [];

          const throttled = pThrottle(i => i, 1, 1000);
          const formatedListType = listType.replace(/_/gi, "");
          for (let i = 1; i <= pages; i++) {
            throttled(i).then(() => {
              const run = async () => {
                const response = await fetch(
                  `https://api.jikan.moe/v3/user/${username}/mangalist/${formatedListType}/${i}`
                )
                  .then(res => res.json())
                  .then(res => res.manga)
                  .then(mangaArray => {
                    allManga.push(...mangaArray);
                    return mangaArray;
                  })
                  .then(async () => {
                    if (allManga.length === entries) {
                      const localManga = await AsyncStorage.getItem(
                        "mangalists"
                      ); //JSON data
                      const parsedlocalManga = JSON.parse(localManga); //array of objects
                      const mangaTitles = allManga.map(manga => manga.title);
                      const localMangaLists = [
                        ...parsedlocalManga,
                        { name: listName, list: mangaTitles }
                      ];
                      const currentMangaList = {
                        name: listName,
                        list: mangaTitles
                      };
                      await AsyncStorage.setItem(
                        "mangalists",
                        JSON.stringify(localMangaLists)
                      );
                      await AsyncStorage.setItem(
                        "current-manga-list-name",
                        listName
                      );
                      dispatch({ type: "$CLOSE_MANGALIST" });
                      return dispatch({
                        type: "$MAL_LIST_IMPORTED",
                        localMangaLists,
                        currentMangaList
                      });
                    }
                  });
                return Response;
              };
              (async () => {
                await pRetry(run, {
                  retries: 5
                });
              })();
            });
          }
        })
        .catch(e => dispatch({ type: "$LOCAL_MANGA_FAIL" }));
    } catch (e) {
      // alert(e);
    }
  };
};

export const createMangaList = listName => {
  return async dispatch => {
    try {
      const mangaLists = await AsyncStorage.getItem("mangalists");
      const parsedMangaLists = JSON.parse(mangaLists);
      const brandNewList = { name: listName, list: [] };

      await AsyncStorage.setItem(
        "mangalists",
        JSON.stringify([...parsedMangaLists, brandNewList])
      );
      await AsyncStorage.setItem("current-manga-list-name", listName).then(
        () => {
          dispatch({
            type: "$CREATE_MANGA_LIST",
            currentMangaList: brandNewList,
            localMangaLists: [...parsedMangaLists, brandNewList]
          });
        }
      );
    } catch (e) {
      alert(e);
    }
  };
};

export const changeMangaList = listName => {
  return async dispatch => {
    try {
      const mangaLists = await AsyncStorage.getItem("mangalists");
      const parsedMangaLists = JSON.parse(mangaLists);
      const findMangaList = parsedMangaLists.find(
        list => list.name === listName
      );

      await AsyncStorage.setItem("current-manga-list-name", listName)
        .then(() => {
          dispatch({ type: "$UPDATE_MANGALIST" });
        })
        .then(() => {
          dispatch({
            type: "$CHANGE_MANGA_LIST",
            currentMangaList: findMangaList
          });
        });
    } catch (e) {
      alert(e);
    }
  };
};

export const removeMangaList = listName => {
  return async dispatch => {
    try {
      const mangaLists = await AsyncStorage.getItem("mangalists");
      const parsedMangaLists = JSON.parse(mangaLists);

      const listWithoutRemovable = parsedMangaLists.filter(
        list => list.name !== listName
      );
      await AsyncStorage.setItem(
        "mangalists",
        JSON.stringify(listWithoutRemovable)
      ).then(() => {
        dispatch({
          type: "$REMOVE_MANGA_LIST",
          localMangaLists: listWithoutRemovable
        });
      });
    } catch (e) {
      alert(e);
    }
  };
};
