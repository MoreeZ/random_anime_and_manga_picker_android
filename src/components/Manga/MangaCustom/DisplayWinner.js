import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Text, Spinner } from "native-base";

class DisplayWinner extends Component {
  render() {
    if (this.props.winner && this.props.winner !== "") {
      const { winner } = this.props;
      return (
        <View style={styles.mangaTitle}>
          <Text style={styles.mangaTitleText}>{winner}</Text>
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
    winner: state.mangaCustomReducer.winner
  };
};

export default connect(mapStateToProps)(DisplayWinner);

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
