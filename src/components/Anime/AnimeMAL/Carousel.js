import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated
} from "react-native";
import { connect } from "react-redux";

class Carousel extends Component {
  // animeToRender = allAnime => {
  //   const { listTypeF, airing_statusF, episodesF } = this.props.filters;

  //   const minEpisodes = episodesF.from; //0
  //   const maxEpisodes = episodesF.to; // 1

  //   const airingFilter = allAnime.filter(
  //     anime => !airing_statusF.includes(anime.airing_status)
  //   );
  //   airingFilter.length === allAnime.length && (airingFilter.length = 0);

  //   const episodeFilter = allAnime.filter(anime => {
  //     let episodes = anime.total_episodes;
  //     if (maxEpisodes === 0 && minEpisodes === 0) {
  //       return false;
  //     } else if (maxEpisodes === 0 && minEpisodes !== 0) {
  //       return episodes <= minEpisodes;
  //     } else if (maxEpisodes !== 0 && minEpisodes === 0) {
  //       return episodes >= maxEpisodes;
  //     } else {
  //       return episodes <= minEpisodes || episodes >= maxEpisodes;
  //     }
  //   });

  //   const listTypeFilter = allAnime.filter(
  //     each => each.watching_status === listTypeF
  //   );

  //   const animeToFilter = [...new Set([].concat(airingFilter, episodeFilter))];
  //   const filteredAnime = listTypeFilter.filter(
  //     anime => !animeToFilter.includes(anime)
  //   );

  //   const myRandomAnime = anime => {
  //     let arr = [...anime];
  //     for (let i = arr.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [arr[i], arr[j]] = [arr[j], arr[i]];
  //     }
  //     return arr
  //       .map((each, index) => {
  //         if (index < 50) {
  //           return each;
  //         }
  //       })
  //       .filter(x => x);
  //   };
  //   // this.props.logRandomAnime(myRandomAnime(filteredAnime));
  //   return myRandomAnime(filteredAnime);
  // };

  render() {
    const { random50anime, allAnime } = this.props;

    let renderXtimes = [];
    if (random50anime.length > 0) {
      for (let i = 0; i < 50; i += random50anime.length) {
        renderXtimes.push(i);
      }
      if (random50anime.length === 50) {
        renderXtimes.pop();
      }
    }
    renderXtimes.shift();

    return (
      <View style={styles.carouselContainer}>
        <Animated.View
          style={{ ...styles.carousel, translateX: this.props.spinAnim }}
          hardwareAcceleration
        >
          {renderXtimes.length > 0 ? (
            renderXtimes.map(x => (
              <View key={x} style={styles.carousel}>
                {random50anime.map(item => (
                  <ImageBackground
                    key={item.mal_id}
                    source={{ uri: item.image_url }}
                    style={styles.backgroundimage}
                  >
                    <View style={styles.eachtextbg}>
                      <Text style={styles.eachtext}>{item.title}</Text>
                    </View>
                  </ImageBackground>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.carousel}>
              {random50anime.map((item, index) => {
                if (index < 50) {
                  return (
                    <ImageBackground
                      key={item.mal_id}
                      source={{ uri: item.image_url }}
                      style={styles.backgroundimage}
                    >
                      <View style={styles.eachtextbg}>
                        <Text style={styles.eachtext}>{item.title}</Text>
                      </View>
                    </ImageBackground>
                  );
                }
              })}
            </View>
          )}

          <View style={styles.carousel}>
            {random50anime.map(item => (
              <ImageBackground
                key={item.mal_id}
                source={{ uri: item.image_url }}
                style={styles.backgroundimage}
              >
                <View style={styles.eachtextbg}>
                  <Text style={styles.eachtext}>{item.title}</Text>
                </View>
              </ImageBackground>
            ))}
          </View>
          {random50anime.map((item, index) => {
            if (index <= 5) {
              return (
                <ImageBackground
                  key={item.mal_id}
                  source={{ uri: item.image_url }}
                  style={styles.backgroundimage}
                >
                  <View style={styles.eachtextbg}>
                    <Text style={styles.eachtext}>{item.title}</Text>
                  </View>
                </ImageBackground>
              );
            }
          })}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    spinAnim: state.navReducer.spinanimeMalCarousel,
    random50anime: state.animeMalReducer.random50anime,
    filters: state.animeMalReducer.filters,
    allAnime: state.animeMalReducer.userAnime,
    testCheck: state.animeMalReducer.testCheck
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logRandomAnime: anime => {
      dispatch({ type: "LOG_RANDOM_ANIME", anime });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);

const styles = StyleSheet.create({
  carouselContainer: {
    height: 295,
    overflow: "hidden"
  },
  carousel: {
    height: "100%",
    flexDirection: "row"
  },
  backgroundimage: {
    width: 200,
    height: "100%",
    borderColor: "white",
    borderWidth: 2,
    marginRight: 10,
    overflow: "hidden"
  },
  eachtextbg: {
    position: "absolute",
    bottom: 0,
    height: 65,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 5
  },
  eachtext: {
    color: "white",
    fontFamily: "Roboto-Medium"
  }
});
