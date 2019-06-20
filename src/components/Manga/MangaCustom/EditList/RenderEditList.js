import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import EachEditButton from "./EachEditButton";
import { connect } from "react-redux";

class RenderEditList extends Component {
  shouldComponentUpdate() {
    return this.props.updateList;
  }

  render() {
    const { currentMangaList } = this.props;
    return (
      <View style={styles.listcontainer}>
        {currentMangaList.list &&
          currentMangaList.list.map((manga, index) => (
            <React.Fragment key={index}>
              <View style={styles.eachtextContainer} onL>
                <Text
                  style={{
                    ...styles.eachtext,
                    width: Dimensions.get("window").width - 80
                  }}
                >
                  {manga}
                </Text>
                <EachEditButton manga={manga} />
              </View>
              {index < currentMangaList.list.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    updateList: state.mangaCustomReducer.updateList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    lockList: () => {
      dispatch({ type: "$LOCK_MANGALIST" });
    },
    updateMangaList: () => {
      dispatch({ type: "$UPDATE_MANGALIST" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderEditList);

const styles = StyleSheet.create({
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
    alignItems: "flex-start",
    padding: 20
  },
  divider: {
    height: 1,
    backgroundColor: "#BABABA",
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  }
});
