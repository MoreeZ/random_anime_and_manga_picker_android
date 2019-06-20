import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import Reinput from "reinput";
import { Form, Button, Text } from "native-base";
import { connect } from "react-redux";
import { addLocalAnime } from "../../../actions/localActions";

class AddAnimeForm extends Component {
  state = { animeTitle: "" };
  handleSubmit = () => {
    Keyboard.dismiss();
    const alreadyExists = this.props.currentAnimeList.list.find(
      each => each === this.state.animeTitle
    );
    if (
      this.state.animeTitle &&
      this.state.animeTitle !== "" &&
      !alreadyExists
    ) {
      this.props.addAnime(this.state.animeTitle);
      this.setState({
        ...this.state,
        animeTitle: ""
      });
    }
  };

  handleChange = text => {
    this.setState({
      ...this.state,
      animeTitle: text
    });
  };

  render() {
    return (
      <View style={styles.usernameform}>
        <Form style={styles.form}>
          <Reinput
            label="Enter Anime Title"
            underlineActiveColor="#FF4081"
            activeColor="#FF4081"
            value={this.state.animeTitle}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSubmit}
          />
          <Button
            style={styles.button}
            name="submitButton"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttontext}> ADD ANIME </Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentAnimeList: state.animeCustomReducer.currentAnimeList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAnime: anime => {
      dispatch(addLocalAnime(anime));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAnimeForm);

const styles = StyleSheet.create({
  usernameform: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: 300,
    marginBottom: 10
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#FF4081",
    height: 34
  },
  buttontext: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "normal"
  },
  input: {
    textAlign: "center"
  }
});
