import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "native-base";
import { connect } from "react-redux";
import { removeAnimeFromList } from "../../../../actions/localActions";

class EachEditButton extends Component {
  state = { deleted: false, initial: false };
  handleMarkDeleted = anime => {
    this.setState({
      deleted: true
    });
    this.props.lockList();
    this.props.removeAnime(anime);
  };
  render() {
    const { anime } = this.props;
    return (
      <React.Fragment>
        {this.state.deleted ? (
          <View>
            <Text style={{ color: "#FF4081", lineHeight: 30 }}>Deleted</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (!this.state.markedForDelete) {
                this.handleMarkDeleted(anime);
              }
            }}
          >
            <Icon
              type="Ionicons"
              name="close"
              style={{
                color: "#FF4081",
                paddingBottom: 2
              }}
            />
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeAnime: anime => {
      dispatch(removeAnimeFromList(anime));
    },
    lockList: () => {
      dispatch({ type: "LOCK_ANIMELIST" });
    }
  };
};

const mapStateToProps = state => {
  return {
    animeToDelete: state.animeCustomReducer.animeToDelete
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EachEditButton);
