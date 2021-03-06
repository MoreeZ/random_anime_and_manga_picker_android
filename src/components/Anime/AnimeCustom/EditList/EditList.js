import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground
} from "react-native";
import { Button, Spinner } from "native-base";
import { connect } from "react-redux";
import RenderEditList from "./RenderEditList";

class EditList extends Component {
  state = {};
  handleRemoveAnime = anime => {
    this.props.removeAnime(anime, this.props.currentAnimeList);
  };

  render() {
    const { currentAnimeList, showDeleteConfirm } = this.props;
    return (
      <ScrollView style={styles.mainContainer}>
        {currentAnimeList.list.length < 250 || this.state.loadAnyway ? (
          <RenderEditList currentAnimeList={currentAnimeList} />
        ) : (
          <ImageBackground
            source={require("../../../../../assets/images/yuitiredBG.png")}
            style={styles.warningContainer}
          >
            <View style={{ width: "100%", height: "100%", padding: 20 }}>
              <Text style={styles.warningHeading}>Large List Warning!</Text>
              <Text style={styles.warningText}>
                Your list has {currentAnimeList.list.length} entries in it!
                Loading it may decrease perforamce or even crash the
                application.
              </Text>
              <Button
                onPress={() => {
                  this.setState({ ...this.state, loadAnyway: true });
                }}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>LOAD ANYWAY</Text>
              </Button>
            </View>
          </ImageBackground>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentAnimeList: state.animeCustomReducer.currentAnimeList
  };
};

export default connect(mapStateToProps)(EditList);

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%"
  },
  warningContainer: {
    width: "100%",
    height: 279
  },
  warningHeading: {
    fontSize: 30,
    fontFamily: "Roboto-Bold",
    marginBottom: 12,
    color: "#333333"
  },
  warningText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#444444"
  },
  buttonStyle: {
    backgroundColor: "#009EE1",
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
