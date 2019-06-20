import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import { Button, Text, Icon } from "native-base";
import Filters from "./Filters";
import Details from "./Details";
import { connect } from "react-redux";
import { fetchMangaInfo } from "../../../actions/$malActions";

class AboveCarousel extends Component {
  state = { showToast: false };
  handleOpenFilters = () => {
    this.props.openFilters();
  };
  handleOpenDetails = () => {
    this.props.openDetails();
  };
  handleSpinAnimation = () => {
    const { random50manga } = this.props;
    const DURATION = 5000;
    if (random50manga && random50manga.length > 0) {
      const eachWidth = 210;
      const winnerNumber = Math.floor(Math.random() * random50manga.length);
      this.props.logWinner(random50manga[winnerNumber].mal_id);
      const winnerPosition = winnerNumber * eachWidth;
      const deviceCenter = Dimensions.get("window").width / 2;
      const test = Math.floor((eachWidth - 30) * Math.random() + 15);
      let amountOfEntries = -1;
      for (let i = 0; i < 50; i += random50manga.length) {
        amountOfEntries++;
      }
      const skipVirtuals =
        random50manga.length === 50
          ? 50 * eachWidth
          : amountOfEntries * random50manga.length * eachWidth;

      const spindistance = skipVirtuals + winnerPosition - deviceCenter + test;
      Animated.timing(
        // Animate over time
        this.props.slideAnim, // The animated value to drive
        {
          toValue: -spindistance, // Animate to opacity: 1 (opaque)
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          duration: DURATION // Make it take a while
        }
      ).start();
      Animated.timing(this.props.pointerAnim, {
        toValue: 1,
        duration: 300
      }).start();
      this.props.hideRollAndFilters();
      this.props.hideUsernameForm();
      setTimeout(() => {
        this.props.showResetAndDetails();
        this.props.showMangaTitle();
      }, DURATION);
    }
  };
  handleResetSpinner = () => {
    const ROLLBACK = 300;
    Animated.timing(this.props.slideAnim, {
      toValue: -100,
      duration: ROLLBACK
    }).start();
    Animated.timing(this.props.pointerAnim, {
      toValue: 0,

      duration: ROLLBACK
    }).start();
    this.props.hideResetAndDetails();
    this.props.hideMangaTitle();
    setTimeout(() => {
      this.props.showRollAndFilters();
      this.props.showUsernameForm();
    }, ROLLBACK);
  };

  render() {
    const { rollMangaAndFilters, resetAndDetails } = this.props;
    return (
      <React.Fragment>
        <View style={styles.container}>
          {rollMangaAndFilters ? (
            <React.Fragment>
              <Button style={styles.button} onPress={this.handleSpinAnimation}>
                <Text style={styles.buttontext}>ROLL A RANDOM MANGA</Text>
              </Button>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={
                  this.props.displayOption.success
                    ? this.handleOpenFilters
                    : () => {}
                }
              >
                {Dimensions.get("window").width >= 400 && (
                  <Text style={styles.filtertext}>FILTERS</Text>
                )}
                <Icon
                  type="Ionicons"
                  name="md-funnel"
                  style={{ color: "#444444", paddingTop: 1 }}
                />
              </TouchableOpacity>
            </React.Fragment>
          ) : (
            resetAndDetails && (
              <React.Fragment>
                <Button
                  style={{ ...styles.button, backgroundColor: "#009EE1" }}
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
                  onPress={this.handleOpenDetails}
                >
                  {Dimensions.get("window").width >= 400 && (
                    <Text style={styles.filtertext}>MORE DETAILS</Text>
                  )}
                  <Icon
                    type="Ionicons"
                    name="arrow-dropdown"
                    style={{ color: "#444444", paddingTop: 1 }}
                  />
                </TouchableOpacity>
              </React.Fragment>
            )
          )}
        </View>
        <Filters />
        <Details />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    filtersVisible: state.$navReducer.filtersVisible,
    slideAnim: state.$navReducer.spinmangaMalCarousel,
    rollMangaAndFilters: state.$navReducer.rollMangaAndFilters,
    resetAndDetails: state.$navReducer.resetAndDetails,
    pointerAnim: state.$navReducer.displayMangaMalPointer,
    random50manga: state.mangaMalReducer.random50manga,
    displayOption: state.mangaMalReducer.displayOption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openFilters: () => {
      dispatch({ type: "$OPEN_MANGA_MAL_FILTERS" });
    },
    openDetails: () => {
      dispatch({ type: "$OPEN_MANGA_DETAILS" });
    },
    hideRollAndFilters: () => {
      dispatch({ type: "$HIDE_ROLL_AND_FILTERS" });
    },
    showRollAndFilters: () => {
      dispatch({ type: "$SHOW_ROLL_AND_FILTERS" });
    },
    showResetAndDetails: () => {
      dispatch({ type: "$SHOW_RESET_AND_DETAILS" });
    },
    hideResetAndDetails: () => {
      dispatch({ type: "$HIDE_RESET_AND_DETAILS" });
    },
    spinCarousel: () => {
      dispatch({ type: "$SPIN_MANGAMAL_CAROUSEL" });
    },
    logWinner: mangaID => {
      dispatch(fetchMangaInfo(mangaID));
    },
    hideUsernameForm: () => {
      dispatch({ type: "$HIDE_USERNAME_FORM" });
    },
    showMangaTitle: () => {
      dispatch({ type: "$SHOW_MANGA_TITLE" });
    },
    showUsernameForm: () => {
      dispatch({ type: "$SHOW_USERNAME_FORM" });
    },
    hideMangaTitle: () => {
      dispatch({ type: "$HIDE_MANGA_TITLE" });
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
    backgroundColor: "#FF4081",
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
