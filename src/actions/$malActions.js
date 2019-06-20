import AsyncStorage from "@react-native-community/async-storage";
const pThrottle = require("p-throttle");
const pRetry = require("p-retry");
// dispatch({ type: "TEST", payload: res.manga })

export const fetchUserMangaList = username => {
  return dispatch => {
    dispatch({ type: "$LOADING_MAL_DATA" });
    fetch(`https://api.jikan.moe/v3/user/${username}`)
      .then(res => res.json())
      .then(res => res.manga_stats.total_entries)
      .then(entries => {
        const pages = Math.floor(entries / 300) + 1;
        let allManga = [];
        const throttled = pThrottle(i => i, 1, 1000);

        for (let i = 1; i <= pages; i++) {
          throttled(i).then(() => {
            const run = async () => {
              const response = await fetch(
                `https://api.jikan.moe/v3/user/${username}/mangalist/all/${i}`
              )
                .then(res => res.json())
                .then(res => res.manga)
                .then(mangaArray => {
                  allManga.push(...mangaArray);

                  return mangaArray;
                })
                .then(async () => {
                  if (allManga.length === entries) {
                    await AsyncStorage.setItem("defaultUsername", username);
                    return dispatch({
                      type: "$MAL_DATA_REQUEST_SUCCESSFUL",
                      payload: allManga
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
      .catch(error => {
        return dispatch({
          type: "$MAL_DATA_REQUEST_FAILED",
          error: error
        });
      });
  };
};

export const fetchMangaInfo = mangaID => {
  return dispatch => {
    dispatch({ type: "$LOADING_MANGA_INFO", mangaID });
    return fetch(`https://api.jikan.moe/v3/manga/${mangaID}`)
      .then(res => res.json())
      .then(res => dispatch({ type: "$MANGA_INFO_LOADED", payload: res }))
      .catch(err =>
        dispatch({ type: "$MANGA_INFO_FAILED_TO_LOAD", error: err })
      );
  };
};
