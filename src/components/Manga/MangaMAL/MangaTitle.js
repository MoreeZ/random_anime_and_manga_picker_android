import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, Spinner } from "native-base";

class MangaTitle extends Component {
  render() {
    if (this.props.mangaInfo) {
      const { mangaInfo } = this.props;
      const noWords =
        mangaInfo.title_japanese &&
        mangaInfo.title_japanese.replace(/\w/gi, "");
      return (
        <View style={styles.mangaTitle}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(mangaInfo.url);
            }}
          >
            <Text style={styles.mangaTitleText}>{mangaInfo.title}</Text>
          </TouchableOpacity>
          <Text style={styles.mangaTitleJapanese}>{noWords}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.mangaTitle}>
          <Spinner color="#444444" size={110} />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    mangaInfo: state.mangaMalReducer.mangaInfo
  };
};

export default connect(mapStateToProps)(MangaTitle);

const styles = StyleSheet.create({
  mangaTitle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  mangaTitleText: {
    fontSize: 22,
    fontFamily: "Roboto-Medium",
    color: "black",
    textAlign: "center"
  },
  mangaTitleJapanese: {
    fontSize: 16,
    color: "#009EE1",
    textAlign: "center"
  }
});
