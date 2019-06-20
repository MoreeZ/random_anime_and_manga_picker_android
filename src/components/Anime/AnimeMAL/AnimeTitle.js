import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, Spinner } from "native-base";

class AnimeTitle extends Component {
  render() {
    if (this.props.animeInfo) {
      const { animeInfo } = this.props;
      const noWords =
        animeInfo.title_japanese &&
        animeInfo.title_japanese.replace(/\w/gi, "");
      return (
        <View style={styles.animeTitle}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(animeInfo.url);
            }}
          >
            <Text style={styles.animeTitleText}>{animeInfo.title}</Text>
          </TouchableOpacity>
          <Text style={styles.animeTitleJapanese}>{noWords}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.animeTitle}>
          <Spinner color="#444444" size={110} />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    animeInfo: state.animeMalReducer.animeInfo
  };
};

export default connect(mapStateToProps)(AnimeTitle);

const styles = StyleSheet.create({
  animeTitle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  animeTitleText: {
    fontSize: 22,
    fontFamily: "Roboto-Medium",
    color: "black",
    textAlign: "center"
  },
  animeTitleJapanese: {
    fontSize: 16,
    color: "#FF4081",
    textAlign: "center"
  }
});
