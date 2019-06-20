import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
  Dimensions
} from "react-native";
import { Icon, Spinner } from "native-base";
import { connect } from "react-redux";

class Details extends Component {
  handleCloseDetails = () => {
    this.props.closeDetails();
  };

  render() {
    const { animeInfo } = this.props;
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.props.detailsVisible}
      >
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
            onPress={this.handleCloseDetails}
          />
          <View
            style={{
              marginTop: 22,
              position: "absolute",
              bottom: 0,
              height: 375,
              width: "100%",
              backgroundColor: "white"
            }}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.viewatmal}
                onPress={() => {
                  Linking.openURL(animeInfo.url);
                }}
              >
                <Text style={styles.viewatmalTEXT}>VIEW AT MYANIMELIST</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.handleCloseDetails}
              >
                {Dimensions.get("window").width >= 400 && (
                  <Text style={styles.detailtext}>MORE DETAILS</Text>
                )}
                <Icon
                  type="Ionicons"
                  name="arrow-dropdown"
                  style={{ color: "#FF4081", paddingTop: 1 }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20 }}>
              {animeInfo ? (
                <React.Fragment>
                  <View style={styles.listcontainer}>
                    <Text style={styles.headertext}>INFORMATION</Text>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Genres: </Text>
                      <Text style={styles.eachInfo}>
                        {animeInfo.genres.map((genre, index) => {
                          if (index < animeInfo.genres.length - 1) {
                            return genre.name + ", ";
                          } else {
                            return genre.name;
                          }
                        })}
                      </Text>
                    </View>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Episodes: </Text>
                      <Text style={styles.eachInfo}>{animeInfo.episodes}</Text>
                    </View>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Status: </Text>
                      <Text style={styles.eachInfo}>{animeInfo.status}</Text>
                    </View>
                    {animeInfo.premiered && animeInfo.premiered !== "" && (
                      <View style={styles.eachtextContainer}>
                        <Text style={styles.eachtext}>Aired: </Text>
                        <Text style={styles.eachInfo}>
                          {animeInfo.premiered}
                        </Text>
                      </View>
                    )}
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Duration: </Text>
                      <Text style={styles.eachInfo}>{animeInfo.duration}</Text>
                    </View>
                    <View style={styles.divider} />
                  </View>
                  <View style={styles.listcontainer}>
                    <Text style={styles.headertext}>RATINGS</Text>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Score: </Text>
                      <Text style={styles.eachInfo}>{animeInfo.score}</Text>
                    </View>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Rank: </Text>
                      <Text style={styles.eachInfo}>{animeInfo.rank}</Text>
                    </View>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Popularity: </Text>
                      <Text style={styles.eachInfo}>
                        {animeInfo.popularity}
                      </Text>
                    </View>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Members: </Text>
                      <Text style={styles.eachInfo}>{animeInfo.members}</Text>
                    </View>
                    <View style={styles.divider} />
                  </View>
                  <View style={styles.listcontainer}>
                    <Text style={styles.headertext}>DESCRIPTION</Text>
                    <View style={styles.eachtextContainer}>
                      <Text style={styles.eachtext}>Synopsis: </Text>
                      <Text style={{ ...styles.eachInfo, marginBottom: 30 }}>
                        {animeInfo.synopsis}
                      </Text>
                    </View>
                  </View>
                </React.Fragment>
              ) : (
                <Spinner color="#444444" size={120} />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  detailtext: {
    color: "#FF4081",
    padding: 0,
    margin: 0,
    paddingRight: 9,
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  },
  viewatmal: {
    position: "absolute",
    left: 20,
    top: 20
  },
  viewatmalTEXT: {
    fontSize: 16,
    fontFamily: "Roboto-LIGHT",
    color: "#009EE1"
  },
  header: {
    height: 60,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight: 20
  },
  eachtext: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    color: "#444444"
  },
  headertext: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "gray"
  },
  eachtextContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%"
  },
  eachInfo: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    color: "#444444",
    flex: 1,
    flexWrap: "wrap"
  },
  listcontainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  divider: {
    height: 1,
    backgroundColor: "#BABABA",
    width: "100%",
    marginTop: 17,
    marginBottom: 17
  },
  eachradio: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    detailsVisible: state.navReducer.detailsVisible,
    animeInfo: state.animeMalReducer.animeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDetails: () => {
      dispatch({ type: "CLOSE_ANIME_DETAILS" });
    },
    changeListType: listType => {
      dispatch({ type: "CHANGE_LIST_TYPE", listType });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
