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
import { getLocalMangaData } from "../../../actions/$localActions";
import AddMangaForm from "./AddMangaForm";
import Carousel from "./Carousel";
import AboveCarousel from "./AboveCarousel";
import DisplayWinner from "./DisplayWinner";
import MangaList from "./MangaList";

class MangaCustom extends Component {
  componentDidMount() {
    this.props.getLocalManga();
  }
  render() {
    const {
      loadingStatus,
      displayAddManga,
      displayWinner,
      displayMangaPointer
    } = this.props;
    return (
      <View style={styles.maincontainer}>
        <ImageBackground
          source={{ uri: "https://i.ibb.co/j6zvX14/peepohappy.png" }}
          style={{ width: "100%", position: "relative", flex: 1 }}
        >
          {displayAddManga ? (
            <AddMangaForm />
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
                {this.props.rollMangaAndMangaList && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.refreshCarousel();
                    }}
                    style={{ position: "absolute", top: 14, left: 14 }}
                  >
                    <Icon name="refresh" style={{ color: "#009EE1" }} />
                  </TouchableOpacity>
                )}
              </React.Fragment>
            ) : (
              <Spinner color="white" size={150} />
            )}
          </View>
        </View>
        <Animated.View
          style={{
            ...styles.pointer,
            scaleX: displayMangaPointer,
            width: Dimensions.get("window").width
          }}
        />
        <MangaList />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    localManga: state.mangaCustomReducer.localManga,
    displayMangaPointer: state.mangaCustomReducer.displayMangaPointer,
    displayWinner: state.mangaCustomReducer.displayWinner,
    displayAddManga: state.mangaCustomReducer.displayAddManga,
    mangaCustomReducer: state.mangaCustomReducer,
    loadingStatus: state.mangaCustomReducer.loadingStatus,
    rollMangaAndMangaList: state.mangaCustomReducer.rollMangaAndMangaList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getLocalManga: () => {
      dispatch(getLocalMangaData());
    },
    refreshCarousel: () => {
      dispatch({ type: "$REFRESH_LOCAL_MANGA_CAROUSEL" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangaCustom);

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
    backgroundColor: "#009EE1",
    bottom: 157
  }
});
