import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Spinner, Icon } from "native-base";
import { connect } from "react-redux";
import AddAnimeForm from "./AddAnimeForm";
import { getLocalAnimeData } from "../../../actions/localActions";
import Carousel from "./Carousel";
import AboveCarousel from "./AboveCarousel";
import DisplayWinner from "./DisplayWinner";
import AnimeList from "./AnimeList";

class AnimeCustom extends Component {
  componentDidMount() {
    this.props.getLocalAnime();
  }
  render() {
    const {
      loadingStatus,
      displayAddAnime,
      displayWinner,
      displayAnimePointer
    } = this.props;
    return (
      <View style={styles.maincontainer}>
        <ImageBackground
          source={{ uri: "https://i.ibb.co/j6zvX14/peepohappy.png" }}
          style={{ width: "100%", position: "relative", flex: 1 }}
        >
          {displayAddAnime ? (
            <AddAnimeForm />
          ) : (
            displayWinner && <DisplayWinner />
          )}
        </ImageBackground>
        <View style={styles.bottom}>
          <View style={styles.bottomTop}>
            <AboveCarousel />
          </View>
          <View style={styles.bottomBottom}>
            {loadingStatus.success || loadingStatus.error ? (
              <React.Fragment>
                <Carousel />
                {this.props.rollAnimeAndAnimeList && (
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
            ) : (
              // ) : loadingStatus.error ? (
              //   <Text style={{ color: "white" }}>
              //     Failed to import the list. Make sure the username you've entered
              //     is valid.
              //   </Text>
              <Spinner color="white" size={150} />
            )}
          </View>
        </View>
        <Animated.View
          style={{
            ...styles.pointer,
            scaleX: displayAnimePointer,
            width: Dimensions.get("window").width
          }}
        />
        <AnimeList />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    localAnime: state.animeCustomReducer.localAnime,
    displayAnimePointer: state.animeCustomReducer.displayAnimePointer,
    displayWinner: state.animeCustomReducer.displayWinner,
    displayAddAnime: state.animeCustomReducer.displayAddAnime,
    animeCustomReducer: state.animeCustomReducer,
    loadingStatus: state.animeCustomReducer.loadingStatus,
    rollAnimeAndAnimeList: state.animeCustomReducer.rollAnimeAndAnimeList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getLocalAnime: () => {
      dispatch(getLocalAnimeData());
    },
    refreshCarousel: () => {
      dispatch({ type: "REFRESH_LOCAL_ANIME_CAROUSEL" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeCustom);

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
    left: 0,
    height: 3,
    backgroundColor: "#FF4081",
    bottom: 157
  }
});
