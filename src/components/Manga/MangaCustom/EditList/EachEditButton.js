import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "native-base";
import { connect } from "react-redux";
import { removeMangaFromList } from "../../../../actions/$localActions";

class EachEditButton extends Component {
  state = { deleted: false, initial: false };
  handleMarkDeleted = manga => {
    this.setState({
      deleted: true
    });
    this.props.lockList();
    this.props.removeManga(manga);
  };
  render() {
    const { manga } = this.props;
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
                this.handleMarkDeleted(manga);
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
    removeManga: manga => {
      dispatch(removeMangaFromList(manga));
    },
    lockList: () => {
      dispatch({ type: "$LOCK_MANGALIST" });
    }
  };
};

const mapStateToProps = state => {
  return {
    mangaToDelete: state.mangaCustomReducer.mangaToDelete
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EachEditButton);
