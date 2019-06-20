import AsyncStorage from "@react-native-community/async-storage";
const pThrottle = require("p-throttle");
const pRetry = require("p-retry");

export const getLocalAnimeData = () => {
  // AsyncStorage.clear();
  return async dispatch => {
    dispatch({ type: "LOADING_LOCAL_ANIME" });
    try {
      const localAnime = await AsyncStorage.getItem("animelists"); //JSON data
      const parsedlocalAnime = JSON.parse(localAnime); //array of objects
      const currentListName = await AsyncStorage.getItem(
        "current-anime-list-name"
      ); //string

      const currentList =
        parsedlocalAnime !== null &&
        parsedlocalAnime.find(list => list.name === currentListName)
          ? parsedlocalAnime.find(list => list.name === currentListName)
          : {
              name: currentListName ? currentListName : "Initial List",
              list: []
            };

      if (localAnime === null) {
        await AsyncStorage.setItem("current-anime-list-name", "Initial List");
        await AsyncStorage.setItem(
          "animelists",
          JSON.stringify(
            parsedlocalAnime
              ? parsedlocalAnime
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
        type: "LOCAL_ANIME_SUCCESS",
        localAnimeLists: parsedlocalAnime
          ? parsedlocalAnime
          : [
              {
                name: currentListName ? currentListName : "Initial List",
                list: []
              }
            ],
        currentAnimeList: currentList
      });
    } catch (error) {
      return dispatch({ type: "LOCAL_ANIME_FAIL", error });
    }
  };
};

export const addLocalAnime = anime => {
  return async dispatch => {
    try {
      const animeLists = await AsyncStorage.getItem("animelists");
      const parsedAnimeLists = JSON.parse(animeLists);
      const currentAnimeListName = await AsyncStorage.getItem(
        "current-anime-list-name"
      ); //string
      const currentAnimeList = parsedAnimeLists.find(
        list => list.name === currentAnimeListName
      );
      const listWithoutCurrent = parsedAnimeLists.filter(
        list => list.name !== currentAnimeList.name
      );

      await AsyncStorage.setItem(
        "animelists",
        JSON.stringify([
          ...listWithoutCurrent,
          {
            name: currentAnimeListName,
            list: [...currentAnimeList.list, anime]
          }
        ])
      ).then(async () => {
        dispatch({
          type: "ADD_ANIME_TO_LOCAL_LIST",
          localAnimeLists: [
            ...listWithoutCurrent,
            {
              name: currentAnimeListName,
              list: [...currentAnimeList.list, anime]
            }
          ],
          currentAnimeList: {
            name: currentAnimeListName,
            list: [...currentAnimeList.list, anime]
          }
        });
      });
    } catch (e) {
      alert(e);
    }
  };
};

export const removeAnimeFromList = anime => {
  return async (dispatch, getState) => {
    try {
      const currList = getState().animeCustomReducer.currentAnimeList;
      const animeLists = await AsyncStorage.getItem("animelists");
      const parsedAnimeLists = JSON.parse(animeLists);
      const listWithoutCurrent = parsedAnimeLists.filter(
        list => list.name !== currList.name
      );
      const currentListWithoutAnime = currList.list.filter(
        each => each !== anime
      );

      await AsyncStorage.setItem(
        "animelists",
        JSON.stringify([
          ...listWithoutCurrent,
          {
            name: currList.name,
            list: currentListWithoutAnime
          }
        ])
      ).then(async () => {
        dispatch({
          type: "ADD_ANIME_TO_LOCAL_LIST",
          localAnimeLists: [
            ...listWithoutCurrent,
            {
              name: currList.name,
              list: currentListWithoutAnime
            }
          ],
          currentAnimeList: {
            name: currList.name,
            list: currentListWithoutAnime
          }
        });
      });
    } catch (e) {
      alert(e);
    }
  };
};

export const importAnimeList = (username, listName, listType) => {
  return async dispatch => {
    try {
      dispatch({ type: "LOADING_LOCAL_ANIME" });
      await fetch(`https://api.jikan.moe/v3/user/${username}`)
        .then(res => res.json())
        .then(res => res.anime_stats[listType])
        .then(entries => {
          const pages = Math.floor(entries / 300) + 1;
          let allAnime = [];

          const throttled = pThrottle(i => i, 1, 1000);
          const formatedListType = listType.replace(/_/gi, "");
          for (let i = 1; i <= pages; i++) {
            throttled(i).then(() => {
              const run = async () => {
                const response = await fetch(
                  `https://api.jikan.moe/v3/user/${username}/animelist/${formatedListType}/${i}`
                )
                  .then(res => res.json())
                  .then(res => res.anime)
                  .then(animeArray => {
                    allAnime.push(...animeArray);
                    return animeArray;
                  })
                  .then(async () => {
                    if (allAnime.length === entries) {
                      const localAnime = await AsyncStorage.getItem(
                        "animelists"
                      ); //JSON data
                      const parsedlocalAnime = JSON.parse(localAnime); //array of objects
                      const animeTitles = allAnime.map(anime => anime.title);
                      const localAnimeLists = [
                        ...parsedlocalAnime,
                        { name: listName, list: animeTitles }
                      ];
                      const currentAnimeList = {
                        name: listName,
                        list: animeTitles
                      };
                      await AsyncStorage.setItem(
                        "animelists",
                        JSON.stringify(localAnimeLists)
                      );
                      await AsyncStorage.setItem(
                        "current-anime-list-name",
                        listName
                      );
                      dispatch({ type: "CLOSE_ANIMELIST" });
                      return dispatch({
                        type: "MAL_LIST_IMPORTED",
                        localAnimeLists,
                        currentAnimeList
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
        .catch(e => dispatch({ type: "LOCAL_ANIME_FAIL" }));
    } catch (e) {
      // alert(e);
    }
  };
};

export const createAnimeList = listName => {
  return async dispatch => {
    try {
      const animeLists = await AsyncStorage.getItem("animelists");
      const parsedAnimeLists = JSON.parse(animeLists);
      const brandNewList = { name: listName, list: [] };

      await AsyncStorage.setItem(
        "animelists",
        JSON.stringify([...parsedAnimeLists, brandNewList])
      );
      await AsyncStorage.setItem("current-anime-list-name", listName).then(
        () => {
          dispatch({
            type: "CREATE_ANIME_LIST",
            currentAnimeList: brandNewList,
            localAnimeLists: [...parsedAnimeLists, brandNewList]
          });
        }
      );
    } catch (e) {
      alert(e);
    }
  };
};

export const changeAnimeList = listName => {
  return async dispatch => {
    try {
      const animeLists = await AsyncStorage.getItem("animelists");
      const parsedAnimeLists = JSON.parse(animeLists);
      const findAnimeList = parsedAnimeLists.find(
        list => list.name === listName
      );

      await AsyncStorage.setItem("current-anime-list-name", listName)
        .then(() => {
          dispatch({ type: "UPDATE_ANIMELIST" });
        })
        .then(() => {
          dispatch({
            type: "CHANGE_ANIME_LIST",
            currentAnimeList: findAnimeList
          });
        });
    } catch (e) {
      alert(e);
    }
  };
};

export const removeAnimeList = listName => {
  return async dispatch => {
    try {
      const animeLists = await AsyncStorage.getItem("animelists");
      const parsedAnimeLists = JSON.parse(animeLists);

      const listWithoutRemovable = parsedAnimeLists.filter(
        list => list.name !== listName
      );
      await AsyncStorage.setItem(
        "animelists",
        JSON.stringify(listWithoutRemovable)
      ).then(() => {
        dispatch({
          type: "REMOVE_ANIME_LIST",
          localAnimeLists: listWithoutRemovable
        });
      });
    } catch (e) {
      alert(e);
    }
  };
};
