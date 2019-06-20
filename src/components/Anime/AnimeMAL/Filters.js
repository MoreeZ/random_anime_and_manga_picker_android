import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions
} from "react-native";
import { Radio, Icon, Input } from "native-base";
import { connect } from "react-redux";
import CheckBox from "react-native-checkbox";
import NumericInput from "react-native-numeric-input";

class Filters extends Component {
  handleCloseFilters = () => {
    this.props.closeFilters();
  };
  handleChangeListType = listType => {
    this.props.changeListType(listType);
  };

  renderListType = (newLT, text) => {
    const { listTypeF } = this.props.filters;
    return (
      <TouchableOpacity
        style={styles.eachradio}
        onPress={() => {
          this.handleChangeListType(newLT);
        }}
      >
        <Text style={styles.eachtext}>{text}</Text>
        <Radio
          color={"#444444"}
          selectedColor={"#009EE1"}
          style={{ paddingTop: 2 }}
          selected={listTypeF === newLT}
          onPress={() => {
            this.handleChangeListType(newLT);
          }}
        />
      </TouchableOpacity>
    );
  };

  renderAiringStatus = (status, text) => {
    const { airing_statusF } = this.props.filters;
    return (
      <TouchableOpacity
        style={styles.eachradio}
        onPress={() => {
          this.props.toggleAiringStatus(status);
        }}
      >
        <Text style={styles.eachtext}>{text}</Text>
        <CheckBox
          label=""
          checked={airing_statusF.includes(status)}
          onChange={() => {
            this.props.toggleAiringStatus(status);
          }}
        />
      </TouchableOpacity>
    );
  };

  renderEpisodes = (updateEpisodes, text, mode) => {
    return (
      <View style={styles.eachradio}>
        <Text style={styles.eachtext}>{text}</Text>
        <NumericInput
          // borderColor={"white"}
          type="up-down"
          totalHeight={34}
          inputStyle={{
            fontSize: 20,
            paddingLeft: 10,
            paddingRight: 10
          }}
          iconStyle={{ fontSize: 20 }}
          containerStyle={{ marginRight: 1 }}
          onChange={value => updateEpisodes(value)}
          minValue={0}
          initValue={this.props.filters.episodesF[mode]}
        />
      </View>
    );
  };

  render() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.props.filtersVisible}
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
            onPress={this.handleCloseFilters}
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
                style={{
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.handleCloseFilters}
              >
                {Dimensions.get("window").width >= 400 && (
                  <Text style={styles.filtertext}>FILTERS</Text>
                )}
                <Icon
                  type="Ionicons"
                  name="md-funnel"
                  style={{ color: "#FF4081", paddingTop: 1 }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20 }}>
              <View style={styles.listcontainer}>
                <Text style={styles.headertext}>LIST TYPE</Text>
                {this.renderListType(6, "Plan To Watch")}
                {this.renderListType(2, "Completed")}
                {this.renderListType(1, "Currently Watching")}
                {this.renderListType(3, "On Hold")}
                {this.renderListType(4, "Dropped")}
                <View style={styles.divider} />
              </View>
              <View style={styles.listcontainer}>
                <Text style={styles.headertext}>NUMBER OF EPISODES</Text>
                {this.renderEpisodes(
                  this.props.updateMinEpisodes,
                  "From:",
                  "from"
                )}
                {this.renderEpisodes(this.props.updateMaxEpisodes, "To:", "to")}
                <View style={styles.divider} />
              </View>
              <View style={styles.listcontainer}>
                <Text style={styles.headertext}>AIRING STATUS</Text>
                {this.renderAiringStatus(1, "Currently Airing")}
                {this.renderAiringStatus(2, "Finished Airing")}
                {this.renderAiringStatus(3, "Not Yet Aired")}
                <View style={styles.divider} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  filtertext: {
    color: "#FF4081",
    padding: 0,
    margin: 0,
    paddingRight: 9,
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  },
  header: {
    height: 60,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight: 20
  },
  eachtext: { fontFamily: "Roboto-Medium", fontSize: 18, color: "#444444" },
  headertext: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "gray"
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
    filtersVisible: state.navReducer.filtersVisible,
    filters: state.animeMalReducer.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeFilters: () => {
      dispatch({ type: "CLOSE_ANIME_MAL_FILTERS" });
    },
    changeListType: listType => {
      dispatch({ type: "CHANGE_LIST_TYPE", payload: listType });
    },
    toggleAiringStatus: status => {
      dispatch({ type: "TOGGLE_AIRING_STATUS", status });
    },
    updateMinEpisodes: episodes => {
      dispatch({ type: "UPDATE_MIN_EPISODES", episodes });
    },
    updateMaxEpisodes: episodes => {
      dispatch({ type: "UPDATE_MAX_EPISODES", episodes });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
