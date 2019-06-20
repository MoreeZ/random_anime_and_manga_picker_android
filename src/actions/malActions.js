import AsyncStorage from "@react-native-community/async-storage";
const pThrottle = require("p-throttle");
const pRetry = require("p-retry");
// dispatch({ type: "TEST", payload: res.anime })
export const fetchUserAnimeList = username => {
  return dispatch => {
    dispatch({ type: "LOADING_MAL_DATA" });
    fetch(`https://api.jikan.moe/v3/user/${username}`)
      .then(res => res.json())
      .then(res => res.anime_stats.total_entries)
      .then(entries => {
        const pages = Math.floor(entries / 300) + 1;
        let allAnime = [];

        const throttled = pThrottle(i => i, 1, 1000);

        for (let i = 1; i <= pages; i++) {
          throttled(i).then(() => {
            const run = async () => {
              const response = await fetch(
                `https://api.jikan.moe/v3/user/${username}/animelist/all/${i}`
              )
                .then(res => res.json())
                .then(res => res.anime)
                .then(animeArray => {
                  allAnime.push(...animeArray);
                  return animeArray;
                })
                .then(async () => {
                  if (allAnime.length === entries) {
                    await AsyncStorage.setItem("defaultUsername", username);
                    return dispatch({
                      type: "MAL_DATA_REQUEST_SUCCESSFUL",
                      payload: allAnime
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
        dispatch({
          type: "MAL_DATA_REQUEST_FAILED",
          error: error
        });
      });
  };
};

export const fetchAnimeInfo = animeID => {
  return dispatch => {
    dispatch({ type: "LOADING_ANIME_INFO", animeID });
    return fetch(`https://api.jikan.moe/v3/anime/${animeID}`)
      .then(res => res.json())
      .then(res => dispatch({ type: "ANIME_INFO_LOADED", payload: res }))
      .catch(err =>
        dispatch({ type: "ANIME_INFO_FAILED_TO_LOAD", error: err })
      );
  };
};
