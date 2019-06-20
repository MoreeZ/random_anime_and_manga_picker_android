import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity
} from "react-native";
import { Spinner, Icon } from "native-base";
import UsernameForm from "./UsernameForm";
import AboveCarousel from "./AboveCarousel";
import { connect } from "react-redux";
import { fetchUserAnimeList } from "../../../actions/malActions";
import Carousel from "./Carousel";
import AnimeTitle from "./AnimeTitle";
import AsyncStorage from "@react-native-community/async-storage";

// Aemnesias Zveroboy
class AnimeMAL extends Component {
  componentDidMount() {
    (async () => {
      const defaultUsername = await AsyncStorage.getItem("defaultUsername");
      return defaultUsername;
    })()
      .then(res => {
        if (res !== null) {
          this.props.fetchAnimeOriginal(res);
        } else {
          this.props.showEnterUsername();
        }
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const {
      displayOption,
      displayUsernameForm,
      displayAnimeTitle,
      rollAnimeAndFilters,
      pointerAnim
    } = this.props;
    return (
      <View style={styles.maincontainer}>
        <ImageBackground
          source={require("../../../../assets/images/bg.png")}
          style={{ width: "100%", position: "relative", flex: 1 }}
        >
          {displayUsernameForm ? (
            <UsernameForm />
          ) : (
            displayAnimeTitle && <AnimeTitle />
          )}
        </ImageBackground>
        <View style={styles.bottom}>
          <View style={styles.bottomTop}>
            <AboveCarousel />
          </View>
          <View style={styles.bottomBottom}>
            {(displayOption.success || displayOption.error) &&
            !this.props.showEnterName ? (
              <React.Fragment>
                <Carousel />
                {rollAnimeAndFilters && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.refreshCarousel();
                    }}
                    style={{ position: "absolute", top: 14, left: 14 }}
                  >
                    <Icon name="refresh" style={{ color: "#FF4081" }} />
                  </TouchableOpacity>
                )}
              </React.Fragment>
            ) : this.props.showEnterName ? (
              <View style={styles.enterUsername}>
                <Text
                  style={{ fontSize: 28, color: "white", textAlign: "center" }}
                >
                  Please Enter Your Username
                </Text>
              </View>
            ) : (
              <Spinner color="white" size={150} />
            )}
          </View>
        </View>
        <Animated.View
          style={{
            ...styles.pointer,
            scaleY: pointerAnim,
            left: Dimensions.get("window").width / 2 - 1
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAnimeOriginal: username => {
      dispatch(fetchUserAnimeList(username));
    },
    refreshCarousel: () => {
      dispatch({ type: "REFRESH_MAL_ANIME_CAROUSEL" });
    },
    showEnterUsername: () => {
      dispatch({ type: "SHOW_ENTER_USERNAME" });
    }
  };
};

const mapStateToProps = state => {
  if (
    state.animeMalReducer.userAnime &&
    state.animeMalReducer.userAnime.length > 0
  ) {
    return {
      displayOption: state.animeMalReducer.displayOption,
      anime: state.animeMalReducer.userAnime,
      pointerAnim: state.navReducer.displayAnimeMalPointer,
      displayUsernameForm: state.navReducer.displayUsernameForm,
      displayAnimeTitle: state.navReducer.displayAnimeTitle,
      rollAnimeAndFilters: state.navReducer.rollAnimeAndFilters,
      defaultUsername: state.navReducer.defaultUsername,
      showEnterName: state.animeMalReducer.showEnterUsername
    };
  } else {
    return {
      anime: [],
      displayOption: state.animeMalReducer.displayOption,
      pointerAnim: state.navReducer.displayAnimeMalPointer,
      displayUsernameForm: state.navReducer.displayUsernameForm,
      displayAnimeTitle: state.navReducer.displayAnimeTitle,
      rollAnimeAndFilters: state.navReducer.rollAnimeAndFilters,
      defaultUsername: state.navReducer.defaultUsername,
      showEnterName: state.animeMalReducer.showEnterUsername
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeMAL);

const styles = StyleSheet.create({
  maincontainer: { height: "100%", flexDirection: "column" },
  bottom: {},
  bottomTop: { height: 60, backgroundColor: "white" },
  bottomBottom: {
    height: 315,
    backgroundColor: "#444444",
    justifyContent: "center",
    flexDirection: "column"
  },
  pointer: {
    position: "absolute",
    width: 3,
    height: 315,
    backgroundColor: "#FF4081",
    bottom: 0
  },
  enterUsername: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  }
});
