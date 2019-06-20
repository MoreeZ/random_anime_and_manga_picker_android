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
import { fetchUserMangaList } from "../../../actions/$malActions";
import Carousel from "./Carousel";
import MangaTitle from "./MangaTitle";
import AsyncStorage from "@react-native-community/async-storage";

// Aemnesias Zveroboy
class MangaMAL extends Component {
  componentDidMount() {
    (async () => {
      const defaultUsername = await AsyncStorage.getItem("defaultUsername");
      return defaultUsername;
    })()
      .then(res => {
        if (res !== null) {
          this.props.fetchMangaOriginal(res);
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
      displayMangaTitle,
      rollMangaAndFilters,
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
            displayMangaTitle && <MangaTitle />
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
                {rollMangaAndFilters && (
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
    fetchMangaOriginal: username => {
      dispatch(fetchUserMangaList(username));
    },
    refreshCarousel: () => {
      dispatch({ type: "$REFRESH_MAL_MANGA_CAROUSEL" });
    },
    showEnterUsername: () => {
      dispatch({ type: "$SHOW_ENTER_USERNAME" });
    }
  };
};

const mapStateToProps = state => {
  if (
    state.mangaMalReducer.userManga &&
    state.mangaMalReducer.userManga.length > 0
  ) {
    return {
      displayOption: state.mangaMalReducer.displayOption,
      manga: state.mangaMalReducer.userManga,
      pointerAnim: state.$navReducer.displayMangaMalPointer,
      displayUsernameForm: state.$navReducer.displayUsernameForm,
      displayMangaTitle: state.$navReducer.displayMangaTitle,
      rollMangaAndFilters: state.$navReducer.rollMangaAndFilters,
      defaultUsername: state.$navReducer.defaultUsername,
      showEnterName: state.mangaMalReducer.showEnterUsername
    };
  } else {
    return {
      manga: [],
      displayOption: state.mangaMalReducer.displayOption,
      pointerAnim: state.$navReducer.displayMangaMalPointer,
      displayUsernameForm: state.$navReducer.displayUsernameForm,
      displayMangaTitle: state.$navReducer.displayMangaTitle,
      rollMangaAndFilters: state.$navReducer.rollMangaAndFilters,
      defaultUsername: state.$navReducer.defaultUsername,
      showEnterName: state.mangaMalReducer.showEnterUsername
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangaMAL);

// export default MangaMAL;

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
    backgroundColor: "#009EE1",
    bottom: 0
  },
  enterUsername: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
