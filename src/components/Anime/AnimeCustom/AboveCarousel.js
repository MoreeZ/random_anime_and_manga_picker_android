import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Linking,
  Dimensions
} from "react-native";
import { Button, Text, Icon } from "native-base";
import { connect } from "react-redux";

class AboveCarousel extends Component {
  handleOpenAnimeList = () => {
    this.props.openAnimeList();
  };
  handleSpinAnimation = () => {
    const { top50localAnime } = this.props;
    const DURATION = 5000;
    if (top50localAnime && top50localAnime.length > 0) {
      const eachHeight = 60;
      const winnerNumber = Math.floor(Math.random() * top50localAnime.length);
      this.props.logWinner(top50localAnime[winnerNumber]);
      const winnerPosition = winnerNumber * eachHeight;
      const deviceCenter = 157;
      const test = Math.floor((eachHeight - 18) * Math.random() + 9);
      let amountOfEntries = -1;
      for (let i = 0; i < 50; i += top50localAnime.length) {
        amountOfEntries++;
      }
      const skipVirtuals =
        top50localAnime.length === 50
          ? 50 * eachHeight
          : amountOfEntries * top50localAnime.length * eachHeight;

      const spindistance = skipVirtuals + winnerPosition - deviceCenter + test;
      Animated.timing(
        // Animate over time
        this.props.spinCustomAnime, // The animated value to drive
        {
          toValue: -spindistance, // Animate to opacity: 1 (opaque)
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          duration: DURATION // Make it take a while
        }
      ).start();
      Animated.timing(this.props.displayAnimePointer, {
        toValue: 1,
        duration: 300
      }).start();
      this.props.hideRollAndAnimeList();
      this.props.hideAddAnime();
      setTimeout(() => {
        this.props.showReset();
        this.props.showWinner();
      }, DURATION);
    }
  };
  handleResetSpinner = () => {
    const ROLLBACK = 300;
    Animated.timing(this.props.spinCustomAnime, {
      toValue: 0,
      duration: ROLLBACK
    }).start();
    Animated.timing(this.props.displayAnimePointer, {
      toValue: 0,

      duration: ROLLBACK
    }).start();
    this.props.hideReset();
    this.props.hideWinner();
    setTimeout(() => {
      this.props.showRollAndAnimeList();
      this.props.showAddAnime();
    }, ROLLBACK);
  };

  render() {
    const { rollAnimeAndAnimeList, resetBtn } = this.props;
    return (
      <React.Fragment>
        <View style={styles.container}>
          {rollAnimeAndAnimeList ? (
            <React.Fragment>
              <Button style={styles.button} onPress={this.handleSpinAnimation}>
                <Text style={styles.buttontext}>ROLL A RANDOM ANIME</Text>
              </Button>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={
                  // this.props.loadingStatus.success
                  //   ? this.handleOpenAnimeList
                  //   : () => {}
                  this.handleOpenAnimeList
                }
              >
                {Dimensions.get("window").width >= 400 && (
                  <Text style={styles.filtertext}>ANIME LIST</Text>
                )}
                <Icon
                  type="Ionicons"
                  name="arrow-dropdown"
                  style={{ color: "#444444", paddingTop: 1 }}
                />
              </TouchableOpacity>
            </React.Fragment>
          ) : (
            resetBtn && (
              <React.Fragment>
                <Button
                  style={{ ...styles.button, backgroundColor: "#FF4081" }}
                  onPress={this.handleResetSpinner}
                >
                  <Text style={styles.buttontext}>RESET THE SPINNER</Text>
                </Button>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    Linking.openURL(
                      `https://myanimelist.net/anime.php?q=${this.props.winner}`
                    );
                  }}
                >
                  {Dimensions.get("window").width >= 400 && (
                    <Text style={styles.filtertext}>MYANIMELIST</Text>
                  )}
                  <Icon
                    type="Ionicons"
                    name="search"
                    style={{ color: "#444444", paddingTop: 1 }}
                  />
                </TouchableOpacity>
              </React.Fragment>
            )
          )}
        </View>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const {
    loadingStatus,
    top50localAnime,
    currentAnimeList,
    spinCustomAnime,
    displayAnimePointer,
    displayWinner,
    displayAddAnime,
    rollAnimeAndAnimeList,
    resetBtn,
    winner
  } = state.animeCustomReducer;
  return {
    loadingStatus,
    top50localAnime,
    currentAnimeList,
    spinCustomAnime,
    displayAnimePointer,
    displayWinner,
    displayAddAnime,
    rollAnimeAndAnimeList,
    resetBtn,
    winner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logWinner: winner => {
      dispatch({ type: "LOG_WINNER", winner });
    },
    hideRollAndAnimeList: () => {
      dispatch({ type: "HIDE_ROLL_AND_ANIME_LIST" });
    },
    hideAddAnime: () => {
      dispatch({ type: "HIDE_ADD_ANIME" });
    },
    showReset: () => {
      dispatch({ type: "SHOW_RESET" });
    },
    showWinner: () => {
      dispatch({ type: "SHOW_WINNER" });
    },
    showRollAndAnimeList: () => {
      dispatch({ type: "SHOW_ROLL_AND_ANIME_LIST" });
    },
    showAddAnime: () => {
      dispatch({ type: "SHOW_ADD_ANIME" });
    },
    hideReset: () => {
      dispatch({ type: "HIDE_RESET" });
    },
    hideWinner: () => {
      dispatch({ type: "HIDE_WINNER" });
    },
    openAnimeList: () => {
      dispatch({ type: "OPEN_ANIMELIST" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboveCarousel);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#009EE1",
    height: 34
  },
  buttontext: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "normal"
  },
  filtertext: {
    color: "#444444",
    padding: 0,
    margin: 0,
    paddingRight: 9
  }
});
