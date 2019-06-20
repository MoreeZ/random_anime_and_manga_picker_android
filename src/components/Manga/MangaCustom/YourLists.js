import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import {
  changeMangaList,
  removeMangaList
} from "../../../actions/$localActions";

class YourLists extends Component {
  state = {};
  handleChangeList = listName => {
    this.props.changeList(listName);
  };
  handleRemoveList = listName => {
    this.props.removeList(listName);
  };
  render() {
    const { currentMangaList, localMangaLists } = this.props;
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.listcontainer}>
          {localMangaLists &&
            localMangaLists.length > 0 &&
            localMangaLists.map((list, index) => (
              <React.Fragment key={index}>
                <View style={styles.eachtextContainer}>
                  {list.name === currentMangaList.name ? (
                    <View
                      style={{
                        flexDirection: "row",
                        width: Dimensions.get("window").width - 80
                      }}
                    >
                      <Icon
                        type="Ionicons"
                        name="arrow-forward"
                        style={{ color: "#009EE1", marginRight: 12 }}
                      />
                      <Text
                        style={{
                          ...styles.eachtext,
                          color: "#009EE1",
                          fontFamily: "Roboto-Bold"
                        }}
                      >
                        {list.name}
                      </Text>
                    </View>
                  ) : (
                    <React.Fragment>
                      <TouchableOpacity
                        style={{ width: Dimensions.get("window").width - 80 }}
                        onPress={() => {
                          this.handleChangeList(list.name);
                        }}
                      >
                        <Text style={styles.eachtext}>{list.name}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleRemoveList(list.name);
                        }}
                      >
                        <Icon
                          type="Ionicons"
                          name="close"
                          style={{ color: "#FF4081", paddingBottom: 2 }}
                        />
                      </TouchableOpacity>
                    </React.Fragment>
                  )}
                </View>
                {index < localMangaLists.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMangaList: state.mangaCustomReducer.currentMangaList,
    localMangaLists: state.mangaCustomReducer.localMangaLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeList: listName => {
      dispatch(changeMangaList(listName));
    },
    removeList: listName => {
      dispatch(removeMangaList(listName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourLists);

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    padding: 20
  },
  eachtext: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    color: "#444444"
  },
  eachtextContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%"
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
    marginTop: 10,
    marginBottom: 10
  }
});
